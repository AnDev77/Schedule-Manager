import styles from '@/styles/common/alert-list-box.module.css';

import RemoveList from '@heroicons/react/24/solid/MinusCircleIcon';
import { useState } from 'react';

const hour = Array.from({length: 24}, (_, i) => i);
const minute = Array.from({length: 60}, (_, i) => i);

const AlertListBox = ({
    value,
    className = '',
    notifyTime,
    onRemove, 
    onSubmit,
    ...props
}) => {
    const notify_time = notifyTime.split(' ');
    const startDate = notify_time[0];
    const time = notify_time[1].split(':');

    const today = new Date();
    const startDay = new Date(startDate);

    const currentHour = today.getHours();
    const currentMinute = today.getMinutes();

    const [selectedDay, setSelectedDay] = useState(startDate);
    const [selectedHour, setSelectedHour] = useState(Number(time[0]));
    const [selectedMinute, setSelectedMinute] = useState(Number(time[1]));

    const getDatesArray = (start, end) => {
        const dates = [];
        start.setHours(0, 0, 0, 0);
        end.setHours(0, 0, 0, 0);

        for (let day = new Date(start); day <= end; day.setDate(day.getDate() + 1)) {
            dates.push(day.toLocaleDateString('en-CA'));
        }
        return dates;
    };

    const dates = getDatesArray(today, startDay);

    const selectableHours = selectedDay === today.toLocaleDateString('en-CA')
        ? hour.slice(currentHour) : hour;
    const selectableMinutes = selectedDay === today.toLocaleDateString('en-CA') && selectedHour === currentHour
        ? minute.slice(currentMinute) : minute;

    const handleSubmit = () => {
        onSubmit(selectedDay, selectedHour, selectedMinute);
    }

    return (
        <div className={styles.div}> 
            <RemoveList className={styles.list} onClick={onRemove}/>

            <div className={styles.inputDiv}>   
                <p className={styles.schedule}>{value}</p>

                <select value={selectedDay} onChange={(e) => {
                    setSelectedDay(e.target.value);
                    if (e.target.value === today.toLocaleDateString('en-CA')) {
                        setSelectedHour(currentHour);
                        setSelectedMinute(currentMinute); 
                    }
                }} className={styles.dropBox}>
                    {dates.map((e, i) => (
                        <option key={i} value={e}>{e}</option>
                    ))}
                </select>

                <select value={selectedHour} onChange={(e) => setSelectedHour(Number(e.target.value))} className={styles.dropBox}>
                    {selectableHours.map((e, i) => (
                        <option key={i} value={e}>{e} 시</option>
                    ))}
                </select>

                <select value={selectedMinute} onChange={(e) => setSelectedMinute(Number(e.target.value))} className={styles.dropBox}>
                    {selectableMinutes.map((e, i) => (
                        <option key={i} value={e}>{e} 분</option>
                    ))}
                </select>

                <input type='submit' value='알림설정' onClick={handleSubmit} className={styles.button}/>
            </div>

        </div>
    );
};

AlertListBox.displayName = 'AlertListBox';

export default AlertListBox;