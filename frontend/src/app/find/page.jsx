'use client'

import InputBox from '@/components/common/input-box';
import BigButton from '@/components/common/big-button';
import Title from '@/components/common/title';
import styles from '@/styles/pages/login.module.css';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

const Find = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
        
    const onSubmit = async (data) => {
        const response = await fetch('http://localhost:3000/users/idcheck', {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            credentials: 'include',
        });

        if (response.status == 400) {
            alert('오류가 발생하였습니다.');
            return;
        }

        if (response.status == 401) {
            alert('존재하지 않는 계정입니다.');
            return;
        }
        
        router.push('/find/changePassword');
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Title>Schedule<br/>Manager</Title>
            <div className={styles.inputContainer}>
                <InputBox
                    {...register('email', { required: true })}
                    placeholder='EMAIL'
                />
                {errors.email && <p>이메일 입력 필수</p>}
            </div>
            <br/>
            <BigButton type='submit' className={styles.loginButton}>계정 확인</BigButton>
        </form>
    )
}

export default Find;