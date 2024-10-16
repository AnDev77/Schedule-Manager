"use client"

import BigButton from '@/components/common/big-button';
import styles from '@/styles/pages/user.module.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useUser } from '@/data/use-user';

const UserInfo = () => {
    const router = useRouter();
    const { email: userEmail } = useUser();
    const [password, setPassword] = useState();
    
    const handleInputChange = (e) => {
        setPassword(e.target.value);
    }

    const handlePwCheck = async () => {
        const response = await fetch('http://localhost:3000/users/login', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({email: userEmail, password})
        })

        if(response.status === 200) {
            router.push('find/changePassword');
        } else {
            alert('비밀번호가 다릅니다. 다시 시도해주세요.')
        }
    }

    const logout = () => {
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        router.push('/')
    }

    const handleLogout = () => {
        logout();
    }


    const handleClick = async () => {
        if(confirm("정말 탈퇴하시겠습니까?")) {
            const response = await fetch(`http://localhost:3000/users/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({ email: userEmail })
            });

            if(response.status === 200) {
                alert('회원 탈퇴가 완료되었습니다.');
                logout();
            } else {
                alert('회원 탈퇴에 실패하였습니다. 다시 시도해주세요.');
            }
        }
    };

    return (
        <div className={styles.main}>
            <h1>회원 정보</h1>
            <div className={styles.div}>
                <p>아이디 :</p>
                <p>{userEmail}</p>
            </div>
            <div className={styles.div}>
                <p>비밀번호 :</p>
                <span>
                    <input type='password' placeholder='PASSWORD' onChange={handleInputChange}/>
                    <button onClick={handlePwCheck}>변경</button>
                </span>
            </div>
            <BigButton className={styles.bigButton} onClick={handleLogout}>로그아웃</BigButton>
            <BigButton className={styles.bigButton} onClick={handleClick}>회원 탈퇴</BigButton>
        </div>
    )
}

export default UserInfo;