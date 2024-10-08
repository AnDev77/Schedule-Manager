'use client'

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const events = [
    { title: 'Meeting1', start: new Date(), allDay: true, },
    { title: 'Meeting2', start: new Date(), allDay: true, },
    { title: 'Meeting3', start: new Date(), allDay: true, },
    { title: 'Meeting4', start: new Date(), allDay: true, },
]

const CalendarMain = () => {
    // TODO: 캘린더 페이지 구현
    return (
        <div>
            <FullCalendar
                plugins={[ dayGridPlugin ]}
                initialView='dayGridMonth'
                events={events}
                height={'100vh'}
                locale={'ko'}
                moreLinkText={(n) => `+${n} 더보기`}
                dayMaxEvents
                nowIndicator
                selectable
            />
        </div>
    )
}

export default CalendarMain;