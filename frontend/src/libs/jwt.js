'use server'

import { cookies } from 'next/headers';

const getJwt = async () => {
    const cookieStore = cookies();
    return cookieStore.get('token')?.value;
}

export { getJwt };