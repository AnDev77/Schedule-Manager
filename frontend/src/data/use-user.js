import { useState, useEffect, useMemo } from 'react';
import { jwtDecode } from 'jwt-decode';

const getJwt = () => {
    if (typeof window === 'undefined') {
        return null;
    }
    const match = document.cookie.match(/(?:^|;)\s*token=([^;]*)/);
    return match ? decodeURIComponent(match[1]) : null;
}

const useUser = () => {
    const [user, setUser] = useState({ id: null, email: null });

    const jwt = useMemo(() => getJwt(), []);

    useEffect(() => {
        if (!jwt) return;

        const { id, email } = jwtDecode(jwt);
        setUser({ id, email });
    }, [jwt]);

    return user;
}

export { useUser };