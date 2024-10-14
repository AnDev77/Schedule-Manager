'use client'

import '@/styles/calendar/calendar-overwrite.css';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useRouter } from 'next/navigation';
import { useUser } from '@/data/use-user';
import { useSchedule } from '@/data/use-schedule';
import { useState, useEffect } from 'react';

const CalendarMain = () => {
    const [scheduleParams, setScheduleParams] = useState(null);
    const router = useRouter();
    const { id: userId } = useUser();
    const { data } = useSchedule(scheduleParams);

    useEffect(() => {
        if (userId) {
            setScheduleParams((prev) => {
                return { ...prev, userId }
            });
        }
    }, [userId]);

    return (
        <FullCalendar
            plugins={[ dayGridPlugin, interactionPlugin ]}
            initialView='dayGridMonth'
            events={
                data?.schedules?.map(s => ({
                    title: s.title,
                    start: s.start_date,
                    end: s.end_date
                }))
            }
            height={'calc(100vh - 2rem)'}
            locale={'ko'}
            buttonText={{
                today: '오늘',
            }}
            buttonHints={{
                today: '오늘 날짜로 이동',
                prev: '지난 달로 이동',
                next: '다음 달로 이동',
            }}
            moreLinkText={(n) => `+${n} 더보기`}
            dateClick={(arg) => { router.push(`/calendar/${arg.dateStr}`) }}
            datesSet={(dateInfo) => {
                setScheduleParams((prev) => {
                    return {
                        ...prev,
                        startDate: dateInfo.startStr.split('T')[0],
                        endDate: dateInfo.endStr.split('T')[0]
                    }
                });
            }}
            dayMaxEvents
            nowIndicator
        />
    )
}

export default CalendarMain;