"use client"

import InputBox from '@/components/common/input-box';
import BigButton from '@/components/common/big-button';
import Title from '@/components/common/title';
import styles from '@/styles/pages/login.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Find = () => {
    // TODO: 유저 설정 페이지(아이디 확인) 구현
    const [id, setId] = useState('');
    const router = useRouter();
        
    const handleClick = (e) => {
        if(id) {
            alert(`Id: ${id}`);
            router.push('/find/changePassword');
        } else {
            alert('아이디를 입력해주세요.')
        }
    }

    return (
        <>
            <Title>Schedule<br/>Manager</Title>
            <InputBox placeholder='ID' value={id} onChange={(e) => setId(e.target.value)} />
            <br/>
            <BigButton className={styles.loginButton} onClick={handleClick}>아이디 확인</BigButton>
        </>
    )
}

export default Find;