"use client"

import InputBox from '@/components/common/input-box';
import BigButton from '@/components/common/big-button';
import Title from '@/components/common/title';
import styles from '@/styles/pages/login.module.css';
import { useState } from 'react';

const Login = () => {
    // TODO: 로그인 페이지 구현
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const handleClick = (e) => {
        alert(`ID: ${id}, PW: ${password}`)
    }

    return (
        <>
            <Title>Schedule<br />Manager</Title>
            <InputBox placeholder='ID' value={id} onChange={(e) => setId(e.target.value)} />
            <InputBox type='password' placeholder='PASSWORD' value={password} onChange={(e) => setPassword(e.target.value)} />
            <div className={styles.links}>
                <a href="/find">아이디/비밀번호 찾기</a>
                <a href="/register">회원가입</a>
            </div>
            <br />
            <BigButton className={styles.loginButton} onClick={handleClick}>로그인</BigButton>
        </>
    )
}

export default Login;