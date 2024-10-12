'use server'

import LoadingSpinner from '@/components/common/loading-spinner';
import { redirect } from 'next/navigation';
import { getJwt } from '@/libs/jwt';

export default async function Home() {
    const jwt = await getJwt();

    console.log(jwt);
    
    if (jwt) {
        redirect('/calendar');
    } else {
        redirect('/login');
    }

    return <LoadingSpinner />;
}
