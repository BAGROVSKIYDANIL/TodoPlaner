import styles from './SideBar.module.scss' 
import { List } from '../List/List';
export const SideBar = () => {
    return (
        <div className={styles.sideBar}>
            <List/>
        </div>
    );
};
