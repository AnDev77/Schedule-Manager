'use client'

import ScheduleInputBox from '@/components/common/schedule-input-box';
import styles from '@/styles/pages/id.module.css';
import PlusCircle from '@heroicons/react/24/solid/PlusCircleIcon';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useSchedule } from '@/data/use-schedule';
import { useUser } from '@/data/use-user';

const CalenderDetail = () => {
    const params = useParams();
    const [scheduleParams, setScheduleParams] = useState({
        userId: null,
        startDate: params.id,
        endDate: params.id
    });
    const { id: userId } = useUser();
    const { data, isLoading } = useSchedule(scheduleParams);

    useEffect(() => {
        if (userId) {
            setScheduleParams((prev) => {
                return { ...prev, userId }
            });
        }
    }, [userId]);
    
    const day = params.id.split('-');
    const viewDay = `${day[0]}년 ${day[1]}월 ${day[2]}일`;

    const handlePlusList = () => {
        // TODO: 일정 추가 구현 (request and mutate useSchedule)
    }

    const handleSubmit = (event, id) => {
        // TODO: 일정 변경 구현 (form onBlur request)
    }

    const handleRemove = (id) => {
        // TODO: 일정 삭제 구현
    }

    const handleUserPlus = () => {
        // TODO: 인원 추가 구현
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
                    {data?.schedules?.map((e) => (
                        <ScheduleInputBox
                            key = {e.id}
                            scheduleId={e.id}
                            scheduleTitle = {e.title}
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