import styles from './List.module.scss'

export const List = () => {
    return (
        <ul className={styles.wrapperList}>
            <li className={styles.item}>
                <span className={styles.title}>Home</span>
                <span className={styles.count}>2</span>
            </li>
            <li className={styles.item}>
                <span className={styles.title}>Home</span>
                <span className={styles.count}>2</span>
            </li>
            <li className={styles.item}>
                <span className={styles.title}>Home</span>
                <span className={styles.count}>2</span>
            </li>
            <li className={styles.item}>
                <span className={styles.title}>Home</span>
                <span className={styles.count}>2</span>
            </li>
            <li className={styles.item}>
                <span className={styles.title}>Home</span>
                <span className={styles.count}>2</span>
            </li>
            <li className={styles.item}>
                <span className={styles.title}>Home</span>
                <span className={styles.count}>2</span>
            </li>
        </ul>
    );
};
