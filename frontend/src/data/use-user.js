import { jwtDecode } from 'jwt-decode';

const getJwt = () => {
    const match = document.cookie.match(/(?:^|;)\s*token=([^;]*)/);
    return match ? decodeURIComponent(match[1]) : null;
}

const useUser = () => {
    const jwt = getJwt();
    if (!jwt) return;
    const { id, email } = jwtDecode(jwt);
    return { id, email };
}

export { useUser };