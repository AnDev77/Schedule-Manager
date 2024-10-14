import styles from '@/styles/common/schedule-input-box.module.css';

import RemoveList from '@heroicons/react/24/solid/MinusCircleIcon';
import UserPlus from '@heroicons/react/24/solid/UserPlusIcon';
import Bell from '@heroicons/react/24/solid/BellIcon';


const ScheduleInputBox = ({
    type = 'text',
    placeholder = '',
    value,
    onChange,
    className = '',
    onRemove, 
    onAlertClick,
    onUserPlusClick,
    ...props
}) => {
    return (
        <div className={styles.div}> 
            <RemoveList className={styles.list} onClick={onRemove}/>
            <div className={styles.inputDiv}>   
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className={`${styles.scheduleInputBox} ${className}`}
                    {...props}
                />
                <Bell className={styles.icons} onClick={onAlertClick}/>
                <UserPlus className={styles.icons} onClick={onUserPlusClick}/>
            </div>
        </div>
    );
};

ScheduleInputBox.dipslayName = 'ScheduleInputBox';

export default ScheduleInputBox;