'use client'

import useUser from '@/data/use-user';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
    const router = useRouter();
    const { loggedOut, error } = useUser();

    useEffect(() => {
        if (loggedOut) {
            router.replace('/login');
        } else {
            router.replace('/calendar');
        }
    }, [router, loggedOut, error]);

    return null;
}
