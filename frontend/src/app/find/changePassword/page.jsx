"use client"

import InputBox from '@/components/common/input-box';
import BigButton from '@/components/common/big-button';
import Title from '@/components/common/title';
import styles from '@/styles/pages/login.module.css';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useUser } from '@/data/use-user';

const ChangePassword = () => {
    // TODO: 유저 설정 페이지(비밀번호 변경) 구현
    const router = useRouter();
    const user = useUser();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
        
    const onSubmit = async (data) => {
        if(data.password !== data.passwordCheck) {
            alert('비밀번호를 확인해주세요.');
            return;
        }

        const email = user?.email ? user.email : sessionStorage.getItem('find_email');
        
        const resp = await fetch('http://localhost:3000/users/reset', {
            mode: 'cors',
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password: data.password,
            }),
            credentials: 'include',
        });

        if (resp.status != 200) {
            alert('오류가 발생하였습니다.');
            return;
        }
        
        sessionStorage.removeItem('find_email');
        router.push('/login');
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Title>Schedule<br/>Manager</Title>
            <div className={styles.inputContainer}>
                <InputBox
                    {...register('password', { required: true })}
                    type='password'
                    placeholder='PASSWORD'
                />
                {errors.password && <p>비밀번호 입력 필수</p>}
            </div>
            <div className={styles.inputContainer}>
                <InputBox
                    {...register('passwordCheck', { required: true })}
                    type='password'
                    placeholder='PASSWORD 확인'
                />
                {errors.passwordCheck && <p>비밀번호 입력 필수</p>}
            </div>
            <br/>
            <BigButton type='submit' className={styles.loginButton}>비밀번호 변경</BigButton>
        </form>
    )
}

export default ChangePassword;