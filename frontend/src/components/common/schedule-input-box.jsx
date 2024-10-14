import styles from '@/styles/common/schedule-input-box.module.css';

import RemoveList from '@heroicons/react/24/solid/MinusCircleIcon';
import UserPlus from '@heroicons/react/24/solid/UserPlusIcon';

const ScheduleInputBox = ({
    scheduleId,
    scheduleTitle,
    onRemove,
    onUserPlusClick,
    onSubmit,
    ...props
}) => {
    return (
        <div className={styles.div}> 
            <RemoveList className={styles.list} onClick={onRemove}/>
            <form className={styles.inputDiv}>
                <input type="number" name="id" defaultValue={scheduleId} hidden />
                <input
                    type='text'
                    placeholder='일정'
                    defaultValue={scheduleTitle}
                    onBlur={onSubmit}
                    className={styles.scheduleInputBox}
                    {...props}
                />
                <UserPlus className={styles.icons} onClick={onUserPlusClick}/>
            </form>
        </div>
    );
};

ScheduleInputBox.dipslayName = 'ScheduleInputBox';

export default ScheduleInputBox;