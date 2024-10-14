'use client'

import ScheduleInputBox from '@/components/common/schedule-input-box';
import styles from '@/styles/pages/id.module.css';
import PlusCircle from '@heroicons/react/24/solid/PlusCircleIcon';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

const CalenderDetail = () => {
    const params = useParams();
    
    const day = params.id.split('-');
    const viewDay = `${day[0]}년 ${day[1]}월 ${day[2]}일`;

    const handlePlusList = () => {
        const newEvents = {
            id: id,
            title: '',
            start:  new Date(),
            allDay: true,
        };
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

    return (
        <>
            <div className={styles.topDiv}>
                <h2>{viewDay}</h2>
                <Link href='/calendar'>
                    <button className={styles.button}>돌아가기</button>
                </Link>
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