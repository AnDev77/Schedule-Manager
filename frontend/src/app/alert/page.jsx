'use client'

import AlertListBox from '@/components/common/alert-list-box';
import styles from '@/styles/pages/alert.module.css';
import { useState, useEffect } from 'react';
import { useUser } from '@/data/use-user';

const Alert = () => {
    const {id: userId} = useUser();
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            const response = await fetch('http://localhost:3000/notifications/all', {
                method: 'POST',
                headers: { 'Content-Type' : 'application/json' },
                body: JSON.stringify({ user_id: userId })
            });

            if(response.status === 200) {
                const data = await response.json();
                setEvents(data);
            } else {
                alert('알람 데이터를 불러올 수 없습니다.');
            }
        }

        fetchNotifications();
    }, [userId]);

    
    const handleRemove = async (id) => {
        const response = await fetch('http://localhost:3000/notifications', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: id})
        });

        if(response.status === 200) {
            const newEvents = events.filter(e => e.id !== id);
            setEvents(newEvents);
            alert('알람이 삭제되었습니다.');
        } else {
            alert('알람 삭제에 실패했습니다.')
        }
    }

    const handleSubmit = async (id, day, hour, minute) => {
        const notifyTime = `${day} ${hour}:${minute}:00`

        const response = await fetch('http://localhost:3000/notifications', {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({id, notify_time: notifyTime})
        });

        if(response.status === 200) {
            alert(`알람이 수정되었습니다. ${notifyTime}`);
        } else {
            alert('알람 변경에 실패했습니다.')
        }
    }

    return (
        <>
            <div className={styles.mainDiv}>
                <div>
                    {events.map((e) => (
                        <AlertListBox
                            key = {e.id}
                            value = {e.title}
                            notifyTime = {e.notify_time}
                            onRemove={() => handleRemove(e.id)}
                            onSubmit={(day, hour, minute) => handleSubmit(e.id, day, hour, minute)}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default Alert;