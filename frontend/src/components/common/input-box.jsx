import styles from '@/styles/common/input-box.module.css';

const InputBox = ({
    type = 'text',
    placeholder = '',
    value,
    onChange,
    className = '',
    ...props
}) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`${styles.inputBox} ${className}`}
            {...props}
        />
    );
};

InputBox.dipslayName = 'InputBox';

export default InputBox;