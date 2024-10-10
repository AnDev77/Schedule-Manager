import ArrowPath from '@heroicons/react/24/outline/ArrowPathIcon';
import styles from '@/styles/common/loading-spinner.module.css';

const LoadingSpinner = () => {
    return (
        <div className={styles.container}>
            <div className={styles.spinner}>
                <ArrowPath className={styles.icons} />
            </div>
        </div>
    );
};

LoadingSpinner.dipslayName = 'LoadingSpinner';

export default LoadingSpinner;