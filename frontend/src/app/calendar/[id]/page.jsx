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
    const { id: userId, email: userEmail } = useUser();
    const { data, mutate } = useSchedule(scheduleParams);

    useEffect(() => {
        if (userId) {
            setScheduleParams((prev) => {
                return { ...prev, userId }
            });
        }
    }, [userId]);
    
    const day = params.id.split('-');
    const viewDay = `${day[0]}년 ${day[1]}월 ${day[2]}일`;

    const handlePlusList = async () => {
        // TODO: 일정 추가 구현 (request and mutate useSchedule)
        const resp = await fetch(`http://localhost:3000/schedules`, {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: userId,
                title: '새 일정',
                start_date: params.id,
                end_date: params.id,
                repet_type: 0
            }),
            credentials: 'include',
        });

        if (resp.status != 201) {
            alert('오류가 발생했습니다.');
            return;
        }

        mutate({ ...data });
    }

    const onSubmit = async (data) => {
        const resp = await fetch(`http://localhost:3000/schedules/${data.id}`, {
            mode: 'cors',
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                schedule_title: data.title,
            }),
            credentials: 'include',
        });

        if (resp.status != 200) {
            alert('오류가 발생했습니다.');
            return;
        }

        mutate({ ...data });
    }

    const handleRemove = async (id) => {
        const resp = await fetch(`http://localhost:3000/schedules/${id}`, {
            mode: 'cors',
            method: 'DELETE',
            credentials: 'include',
        });

        if (resp.status != 200) {
            alert('오류가 발생했습니다.');
            return;
        }

        mutate({ ...data });
    }

    const handleUserPlus = async (id, title) => {
        const invitedEmail = prompt('초대할 이메일을 입력해주세요.');
        if (!invitedEmail) {
            alert('취소되었습니다.');
            return;
        }
        const resp = await fetch(`http://localhost:3000/schedules/share/${id}`, {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_email: userEmail,
                invited_email: invitedEmail,
                schedule_title: title,
            }),
            credentials: 'include',
        });

        if (resp.status != 201) {
            alert('오류가 발생했습니다.')
            return;
        }

        alert(`${invitedEmail}님의 초대가 완료되었습니다.`);
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
                            onSubmit={onSubmit}
                            onRemove = {() => handleRemove(e.id)}
                            onAlertClick={() => handleAlert(e.id)}
                            onUserPlusClick = {() => handleUserPlus(e.id, e.title)}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default CalenderDetail;