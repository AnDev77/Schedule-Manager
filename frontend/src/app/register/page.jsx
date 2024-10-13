"use client"

import InputBox from '@/components/common/input-box';
import BigButton from '@/components/common/big-button';
import Title from '@/components/common/title';
import styles from '@/styles/pages/login.module.css';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

const Register = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        if(data.password != data.passwordCheck) {
            alert('비밀번호가 다릅니다.');
            return;
        }
        
        const resp = await fetch('http://localhost:3000/users/join', {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: data.email,
                password: data.password
            }),
            credentials: 'include',
        });

        if (resp.status != 201) {
            alert('회원가입에 실패하였습니다.');
            return;
        }

        router.push('/login');
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Title>Schedule<br/>Manager</Title>
            <InputBox
                {...register('email', { required: true })}
                placeholder='EMAIL'
            />
            <InputBox
                {...register('password', { required: true })}
                type='password'
                placeholder='PASSWORD'
            />
            <InputBox
                {...register('passwordCheck', { required: true })}
                type='password'
                placeholder='PASSWORD 확인'
            />
            <br/>
            <BigButton type='submit' className={styles.loginButton}>회원가입</BigButton>
        </form>
    )
}

export default Register;