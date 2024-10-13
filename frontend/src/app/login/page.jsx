'use client'

import InputBox from '@/components/common/input-box';
import BigButton from '@/components/common/big-button';
import Title from '@/components/common/title';
import styles from '@/styles/pages/login.module.css';
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation';

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const router = useRouter();

    const onSubmit = async (data) => {
        const response = await fetch('http://localhost:3000/users/login', {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            credentials: 'include',
        });

        if (response.status == 400) {
            let result = await response.json();
            alert(result.map((e) => e.msg).join('\n'));
            return;
        }

        if (response.status != 200) {
            alert('로그인에 실패하였습니다.');
            return;
        }
        
        router.push('/calendar');
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Title>Schedule<br />Manager</Title>
            <div className={styles.inputContainer}>
                <InputBox
                    {...register('email', { required: true })}
                    placeholder='EMAIL'
                />
                {errors.id && <p>이메일 입력 필수</p>}
            </div>
            <div className={styles.inputContainer}>
                <InputBox
                    {...register('password', { required: true })}
                    type='password'
                    placeholder='PASSWORD'
                />
                {errors.password && <p>비밀번호 입력 필수</p>}
            </div>
            <div className={styles.links}>
                <a href='/find'>아이디/비밀번호 찾기</a>
                <a href='/register'>회원가입</a>
            </div>
            <br />
            <BigButton type='submit' className={styles.loginButton}>로그인</BigButton>
        </form>
    )
}

export default Login;