import styles from '@/styles/common/alert-list-box.module.css';

import RemoveList from '@heroicons/react/24/solid/MinusCircleIcon';
import { useState } from 'react';

const hour = Array.from({length: 24}, (_, i) => i);
const minute = Array.from({length: 60}, (_, i) => i);

const AlertListBox = ({
    value,
    className = '',
    onRemove, 
    onSubmit,
    ...props
}) => {
    const [selectedHour, setSelectedHour] = useState(0);
    const [selectedMinute, setSelectedMinute] = useState(0);

    const handleSubmit = () => {
        onSubmit(selectedHour, selectedMinute);
    }

    return (
        <div className={styles.div}> 
            <RemoveList className={styles.list} onClick={onRemove}/>

            <div className={styles.inputDiv}>   
                <p className={styles.schedule}>{value}</p>

                <select value={selectedHour} onChange={(e) => setSelectedHour(Number(e.target.value))} className={styles.dropBox}>
                    {hour.map((e, i) => (
                        <option key={i} value={e}>{e} 시</option>
                    ))}
                </select>

                <select value={selectedMinute} onChange={(e) => setSelectedMinute(Number(e.target.value))} className={styles.dropBox}>
                    {minute.map((e, i) => (
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