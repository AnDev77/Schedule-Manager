"use client"

import InputBox from '@/components/common/input-box';
import BigButton from '@/components/common/big-button';
import Title from '@/components/common/title';
import styles from '@/styles/pages/login.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const ChangePassword = () => {
    // TODO: 유저 설정 페이지(비밀번호 변경) 구현
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const router = useRouter();
        
    const handleClick = (e) => {
        if(password !== passwordCheck) {
            alert('비밀번호를 확인해주세요.');
        } else {
            alert('비밀번호가 변경되었습니다.');
            router.push('/login');
        }
    }

    return (
        <>
            <Title>Schedule<br/>Manager</Title>
            <InputBox type='password' placeholder='PASSWORD' value={password} onChange={(e) => setPassword(e.target.value)} />
            <InputBox type='password' placeholder='PASSWORD 확인' value={passwordCheck} onChange={(e) => setPasswordCheck(e.target.value)} />
            <br/>
            <BigButton className={styles.loginButton} onClick={handleClick}>비밀번호 변경</BigButton>
        </>
    )
}

export default ChangePassword;