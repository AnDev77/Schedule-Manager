import { useState, useEffect, useMemo } from 'react';
import { jwtDecode } from 'jwt-decode';

const getJwt = () => {
    const match = document.cookie.match(/(?:^|;)\s*token=([^;]*)/);
    return match ? decodeURIComponent(match[1]) : null;
}

const useUser = () => {
    const [user, setUser] = useState({ id: null, email: null });

    useEffect(() => {
        const jwt = getJwt();
        if (!jwt) return;
        const { id, email } = jwtDecode(jwt);
        setUser({ id, email });
    }, []);

    return user;
}

export { useUser };