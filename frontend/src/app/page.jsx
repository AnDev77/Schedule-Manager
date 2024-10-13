'use client'

import LoadingSpinner from '@/components/common/loading-spinner';
import { useRouter } from 'next/navigation';
import { useUser } from '@/data/use-user';
import { useEffect } from 'react';

export default function Home() {
    const router = useRouter();
    const user = useUser();
    
    useEffect(() => {
        if (user) {
            router.replace('/calendar');
        } else {
            router.replace('/login');
        }
    }, [router, user])

    return <LoadingSpinner />;
}
