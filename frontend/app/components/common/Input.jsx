// TODO: 스타일링 필요

const Input = ({
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
            className={`${className}`}
            {...props}
        />
    );
};

Input.dipslayName = 'Input';

export default Input;