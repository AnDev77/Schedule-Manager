"use client";

import styles from '@/styles/calendar/header.module.css';

import Bell from '@heroicons/react/24/solid/BellIcon';
import User from '@heroicons/react/24/solid/UserIcon';
import Link from 'next/link';
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
                <Link href='/alert'><Bell className={styles.icons}/></Link>
                <Link href='/'><h1 className={styles.title}>Schedule Manager</h1></Link>
                <Link href='/user'><User className={styles.icons} onClick={handleUserPage}/></Link>
            </header>
            <main className={styles.main}>
                {children}
            </main>
        </div>
    )
}