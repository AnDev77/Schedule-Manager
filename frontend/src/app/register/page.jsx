"use client"

import InputBox from '@/components/common/input-box';
import BigButton from '@/components/common/big-button';
import Title from '@/components/common/title';
import styles from '@/styles/pages/login.module.css';
import { useState } from 'react';

const Register = () => {
    // TODO: 회원가입 페이지 구현
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
        
    const handleClick = (e) => {
        alert(`Id: ${id}, PW: ${password}, PW 확인: ${passwordCheck}`)
    }

    return (
        <>
            <Title>Schedule<br/>Manager</Title>
            <InputBox placeholder='ID' value={id} onChange={(e) => setId(e.target.value)} />
            <InputBox type='password' placeholder='PASSWORD' value={password} onChange={(e) => setPassword(e.target.value)} />
            <InputBox type='password' placeholder='PASSWORD 확인' value={passwordCheck} onChange={(e) => setPasswordCheck(e.target.value)} />
            <br/>
            <BigButton className={styles.loginButton} onClick={handleClick}>회원가입</BigButton>
        </>
    )
}

export default Register;