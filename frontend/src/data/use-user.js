import useSWR from 'swr';
import apiFetcher from '@/libs/api-fetcher';

const useUser = () => {
    const { data, mutate, error } = useSWR('/users', apiFetcher);

    const loading = !data && !error;
    const loggedOut = error && error.status != 200;

    return {
        loading,
        loggedOut,
        user: data,
        mutate
    };
};

export default useUser;