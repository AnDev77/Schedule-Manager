import { createUrlWithParams } from '@/libs/url';
import useSWR from 'swr';

const fetcher = async ([url, startDate, endDate, userId]) => {
    if (!startDate || !userId) {
        return null;
    }

    const urlWithParams = createUrlWithParams(url, {
        calStartDate: startDate,
        calEndDate: endDate,
        user_id: userId,
    });
    const response = await fetch(urlWithParams, {
        mode: 'cors',
        method: 'GET',
        credentials: 'include',
    });
    const json = await response.json();
    return json;
}

const useSchedule = (req) => {
    const { startDate, endDate, userId } = req || {};
    const shouldFetch = startDate && userId;
    const { data, error, isLoading, mutate } = useSWR([shouldFetch ? 'http://localhost:3000/schedules' : null, startDate, endDate, userId], fetcher);

    return {
        data,
        error,
        isLoading,
        mutate
    };
}

export { useSchedule };