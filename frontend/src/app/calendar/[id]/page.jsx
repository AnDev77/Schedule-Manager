'use client'

import ScheduleInputBox from '@/components/common/schedule-input-box';
import styles from '@/styles/pages/id.module.css';
import PlusCircle from '@heroicons/react/24/solid/PlusCircleIcon';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const CalenderDetail = () => {
    // TODO: 일정 보기/수정/삭제 페이지 구현
    const router = useRouter();
    const [id, setId] = useState(5);
    const [events, setEvents] = useState([
        { id: 1, title: 'Meeting1', start: new Date(), allDay: true, },
        { id: 2, title: 'Meeting2', start: new Date(), allDay: true, },
        { id: 3, title: 'Meeting3', start: new Date(), allDay: true, },
        { id: 4, title: 'Meeting4', start: new Date(), allDay: true, },
    ]);


    const handleClick = (e) => {
        router.push('/calendar');
    }

    const handlePlusList = () => {
        const newEvents = {
            id: id,
            title: '',
            start:  new Date(),
            allDay: true,
        };
        setId(id+1);
        setEvents([...events, newEvents])
    }

    const handleInputChange = (event, id) => {
        const newEvents = events.map(e => {
            return e.id === id ? {...e, title: event.target.value} : e
        });
        setEvents(newEvents);
    }

    const handleRemove = (id) => {
        const newEvents = events.filter(e => e.id !== id);
        setEvents(newEvents);
    }

    const handleUserPlus = () => {
        alert("인원추가")
    }

    useEffect(() => {
        console.log(events);
    }, [events])

    return (
        <>
            <div className={styles.topDiv}>
                <h2>2024년 10월 00일</h2>
                <button className={styles.button} onClick={handleClick}>돌아가기</button>
            </div>
            <div className={styles.mainDiv}>
                <PlusCircle className={styles.icons} onClick={handlePlusList}/>
                <div>
                    {events.map((e) => (
                        <ScheduleInputBox
                            key = {e.id}
                            value = {e.title}
                            onChange = {event => handleInputChange(event, e.id)}
                            onRemove = {() => handleRemove(e.id)}
                            onUserPlusClick = {() => handleUserPlus(e.id)}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default CalenderDetail;