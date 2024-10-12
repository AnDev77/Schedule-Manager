"use client"

import BigButton from '@/components/common/big-button';
import styles from '@/styles/pages/user.module.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const UserInfo = () => {
    const router = useRouter();
    const User = "abc123123@naver.com";
    const [password, setPassword] = useState();

    const handleInputChange = (e) => {
        setPassword(e.target.value);
    }

    const handlePwCheck = () => {
        alert(`비밀번호: ${password}`);
        router.push('/find/changePassword');
    }

    const handleClick = () => {
        confirm("정말 탈퇴하시겠습니까?");
    };

    return (
        <div className={styles.main}>
            <h1>회원 정보</h1>
            <div className={styles.div}>
                <p>아이디 :</p>
                <p>{User}</p>
            </div>
            <div className={styles.div}>
                <p>비밀번호 :</p>
                <span>
                    <input type='password' placeholder='PASSWORD' onChange={handleInputChange}/>
                    <button onClick={handlePwCheck}>변경</button>
                </span>
            </div>
            <BigButton className={styles.deleteButton} onClick={handleClick}>회원 탈퇴</BigButton>
        </div>
    )
}

export default UserInfo;