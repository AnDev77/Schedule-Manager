import styles from '@/styles/common/big-button.module.css';

const BigButton = ({
    type = 'button',
    onClick,
    className = '',
    children,
    ...props
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`${styles.bigButton} ${className}`}
        >
            {children}
        </button>
    );
};

BigButton.dipslayName = 'BigButton';

export default BigButton;