import styles from '@/styles/layouts/user-layout.module.css';

const UserLayout = ({ children, className, ...props }) => {
    return (
        <div className={`${styles.userLayout} ${className}`} {...props}>
            {children}
        </div>
    );
};

UserLayout.dipslayName = 'UserLayout';

export default UserLayout;