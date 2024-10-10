"use client"

import InputBox from '@/components/common/input-box';
import BigButton from '@/components/common/big-button';
import Title from '@/components/common/title';
import styles from '@/styles/pages/login.module.css';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

const ChangePassword = () => {
    // TODO: 유저 설정 페이지(비밀번호 변경) 구현
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
        
    const onSubmit = (data) => {
        if(data.password !== data.passwordCheck) {
            alert('비밀번호를 확인해주세요.');
            return;
        }
        alert(JSON.stringify(data, null, 4));
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