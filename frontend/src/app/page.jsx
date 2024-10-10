'use client'

import useUser from '@/data/use-user';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import LoadingSpinner from '@/components/common/loading-spinner';

export default function Home() {
    const router = useRouter();
    const { loading, loggedOut, error } = useUser();

    useEffect(() => {
        if (loggedOut) {
            router.replace('/login');
        } else {
            router.replace('/calendar');
        }
    }, [router, loggedOut, error]);

    return <LoadingSpinner />;
}
