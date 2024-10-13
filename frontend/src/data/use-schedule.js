import { createUrlWithParams } from '@/libs/url';
import useSWR from 'swr';

const fetcher = async ([url, startDate, endDate, userId]) => {
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
    const { startDate, endDate, userId } = req;
    const { data, error, isLoading } = useSWR(['http://localhost:3000/schedules', startDate, endDate, userId], fetcher);

    return {
        data,
        error,
        isLoading
    };
}

export { useSchedule };