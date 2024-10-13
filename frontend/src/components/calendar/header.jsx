"use client";

import styles from '@/styles/calendar/header.module.css';

import Bell from '@heroicons/react/24/solid/BellIcon';
import User from '@heroicons/react/24/solid/UserIcon';
import { useRouter } from 'next/navigation';

export default function Header({
    children
}) {
    const router = useRouter();

    const handleUserPage = (e) => {
        router.push('/user');
    }

    return (
        <div className={styles.div}>
            <header className={styles.header}>
                <Bell className={styles.icons}/>
                <h1 className={styles.title}>Schedule Manager</h1>
                <User className={styles.icons} onClick={handleUserPage}/>
            </header>
            <main className={styles.main}>
                {children}
            </main>
        </div>
    )
}