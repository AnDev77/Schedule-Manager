"use client"

import InputBox from '@/components/common/input-box';
import BigButton from '@/components/common/big-button';
import Title from '@/components/common/title';
import styles from '@/styles/pages/login.module.css';
import { useState } from 'react';
import { useForm } from 'react-hook-form'

const Login = () => {
    // TODO: 로그인 페이지 구현
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        alert(`${JSON.stringify(data, null, 4)}`)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Title>Schedule<br />Manager</Title>
            <InputBox
                {...register('id', { required: true })}
                placeholder='ID'
            />
            <InputBox
                {...register('password', { required: true })}
                type='password'
                placeholder='PASSWORD'
            />
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