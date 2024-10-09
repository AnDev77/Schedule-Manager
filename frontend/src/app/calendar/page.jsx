'use client'

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useRouter } from 'next/navigation';

const events = [
    { id: 1, title: 'Meeting1', start: new Date(), allDay: true, },
    { id: 2, title: 'Meeting2', start: new Date(), allDay: true, },
    { id: 3, title: 'Meeting3', start: new Date(), allDay: true, },
    { id: 4, title: 'Meeting4', start: new Date(), allDay: true, },
]

const CalendarMain = () => {
    // TODO: 캘린더 페이지 구현
    const router = useRouter();

    return (
        <FullCalendar
            plugins={[ dayGridPlugin, interactionPlugin ]}
            initialView='dayGridMonth'
            events={events}
            height={'calc(100vh - 2rem)'}
            locale={'ko'}
            headerToolbar={{
                right: 'customAdd today prev,next'
            }}
            buttonText={{
                today: '오늘',
            }}
            buttonHints={{
                today: '오늘 날짜로 이동',
                prev: '지난 달로 이동',
                next: '다음 달로 이동',
            }}
            customButtons={{
                customAdd: {
                    text: '새 일정',
                    hint: '새 일정 추가',
                    click: () => { router.push('/calendar/new') },
                }
            }}
            moreLinkText={(n) => `+${n} 더보기`}
            dateClick={(arg) => { router.push(`/calendar/${arg.dateStr}`) }}
            dayMaxEvents
            nowIndicator
        />
    )
}

export default CalendarMain;