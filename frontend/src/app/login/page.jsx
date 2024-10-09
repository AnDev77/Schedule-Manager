"use client"

import InputBox from '@/components/common/input-box';
import BigButton from '@/components/common/big-button';
import Title from '@/components/common/title';
import styles from '@/styles/pages/login.module.css';
import { useForm } from 'react-hook-form'

const Login = () => {
    // TODO: 로그인 페이지 구현
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        alert(`${JSON.stringify(data, null, 4)}`)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Title>Schedule<br />Manager</Title>
            <div className={styles.inputContainer}>
                <InputBox
                    {...register('id', { required: true })}
                    placeholder='ID'
                />
                {errors.id && <p>아이디 입력 필수</p>}
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
                <a href="/find">아이디/비밀번호 찾기</a>
                <a href="/register">회원가입</a>
            </div>
            <br />
            <BigButton type='submit' className={styles.loginButton}>로그인</BigButton>
        </form>
    )
}

export default Login;