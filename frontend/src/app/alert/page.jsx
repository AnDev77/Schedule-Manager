'use client'

import AlertListBox from '@/components/common/alert-list-box';
import styles from '@/styles/pages/alert.module.css';
import { useState, useEffect } from 'react';

const Alert = () => {
    // TODO: 일정 보기/수정/삭제 페이지 구현
    const [events, setEvents] = useState([
        { id: 1, title: 'Meeting1', start: new Date(), allDay: true, },
        { id: 2, title: 'Meeting2', start: new Date(), allDay: true, },
        { id: 3, title: 'Meeting3', start: new Date(), allDay: true, },
        { id: 4, title: 'Meeting4', start: new Date(), allDay: true, },
    ]);
    
    const handleRemove = (id) => {
        const newEvents = events.filter(e => e.id !== id);
        setEvents(newEvents);
    }

    const handleSubmit = (hour, minute) => {
        console.log(hour, minute);
    }

    useEffect(() => {
        console.log(events);
    }, [events])

    return (
        <>
            <div className={styles.mainDiv}>
                <div>
                    {events.map((e) => (
                        <AlertListBox
                            key = {e.id}
                            value = {e.title}
                            onRemove={() => handleRemove(e.id)}
                            onSubmit={(hour, minute) => handleSubmit(hour, minute)}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default Alert;