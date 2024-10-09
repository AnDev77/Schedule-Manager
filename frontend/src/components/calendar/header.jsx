import styles from '@/styles/calendar/header.module.css';

import Bell from '@heroicons/react/24/solid/BellIcon';
import User from '@heroicons/react/24/solid/UserIcon';

export default function Header({
    children
}) {
    return (
        <div className={styles.div}>
            <header className={styles.header}>
                <Bell className={styles.icons} />
                <h1 className={styles.title}>Schedule Manager</h1>
                <User className={styles.icons} />
            </header>
            <main className={styles.main}>
                {children}
            </main>
        </div>
    )
}