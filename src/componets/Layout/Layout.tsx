import { ILayout } from './types';
import styles from './Layout.module.scss'

export const Layout = ({children}: ILayout) => {
    return (
        <div className={styles.container}> 
            {children}
        </div>
    );
};
