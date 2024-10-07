import styles from '@/styles/common/title.module.css'

export default function Title({
    children,
    className,
    ...props
}) {
    return (
        <h1 className={`${styles.title} ${className}`} {...props}>{children}</h1>
    )
}