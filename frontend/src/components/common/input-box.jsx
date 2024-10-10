import styles from '@/styles/common/input-box.module.css';

import React from 'react';

const InputBox = React.forwardRef(({
    type = 'text',
    placeholder = '',
    value,
    onChange,
    className = '',
    ...props
}, ref) => {
    return (<input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`${styles.inputBox} ${className}`}
        ref={ref}
        {...props}
    />);
});

InputBox.displayName = 'InputBox';

export default InputBox;