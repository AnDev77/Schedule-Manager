"use client"

import InputBox from '@/components/common/input-box';
import BigButton from '@/components/common/big-button';
import Title from '@/components/common/title';
import styles from '@/styles/pages/login.module.css';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

const Find = () => {
    // TODO: 유저 설정 페이지(아이디 확인) 구현
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
        
    const onSubmit = (data) => {
        alert(JSON.stringify(data, null, 4));
        router.push('/find/changePassword');
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Title>Schedule<br/>Manager</Title>
            <div className={styles.inputContainer}>
                <InputBox
                    {...register('id', { required: true })}
                    placeholder='ID'
                />
                {errors.id && <p>아이디 입력 필수</p>}
            </div>
            <br/>
            <BigButton type='submit' className={styles.loginButton}>아이디 확인</BigButton>
        </form>
    )
}

export default Find;