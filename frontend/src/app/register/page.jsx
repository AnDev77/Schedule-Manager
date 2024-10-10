"use client"

import InputBox from '@/components/common/input-box';
import BigButton from '@/components/common/big-button';
import Title from '@/components/common/title';
import styles from '@/styles/pages/login.module.css';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

const Register = () => {
    // TODO: 회원가입 페이지 구현
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        if(data.password != data.passwordCheck) {
            alert('비밀번호가 다릅니다.');
            return;
        }
        alert(`${JSON.stringify(data, null, 4)}`);
        router.push('/calendar');
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Title>Schedule<br/>Manager</Title>
            <InputBox
                {...register('id', { required: true })}
                placeholder='ID'
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