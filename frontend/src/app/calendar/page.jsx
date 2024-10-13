'use client'

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useRouter } from 'next/navigation';
import { useUser } from '@/data/use-user';
import { useSchedule } from '@/data/use-schedule';

const CalendarMain = () => {
    // TODO: 캘린더 페이지 구현
    const router = useRouter();
    const { id: userId } = useUser();
    const { data: schedules } = useSchedule({ startDate: new Date().toISOString(), endDate: new Date().toISOString(), userId });

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
            dayMaxEvents
            nowIndicator
        />
    )
}

export default CalendarMain;