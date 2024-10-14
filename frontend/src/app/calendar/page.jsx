'use client'

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
    const { data: schedules } = useSchedule(scheduleParams);

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
            events={schedules}
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
                    return { ...prev, startDate: dateInfo.startStr, endDate: dateInfo.endStr }
                });
            }}
            dayMaxEvents
            nowIndicator
        />
    )
}

export default CalendarMain;