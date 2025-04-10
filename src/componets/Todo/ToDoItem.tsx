import styles from './Todo.module.scss'
import { IProps } from '../../types';
import { FaRegTrashCan } from "react-icons/fa6";
import { useState } from 'react';
import Button from '../Button/Button';

export const ToDoItem = ({todo}:IProps) => {
    const [isChecked, setIsChecked] = useState(false)
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    {
        e.stopPropagation()
            const checked = e.target.checked;
            setIsChecked(checked)
    }    
    return (
        <div className={styles.todoItem}>
                <label key={todo._id} className={styles.checkbox} onClick={(e) => e.stopPropagation()}>
                    <input className={styles.checkbox__input} type="checkbox"  onChange={handleCheckboxChange} checked={isChecked}/>
                    <span className={styles.checkbox__indicator}>
                        <svg className={styles.checkbox__indicator_active} width="17" height="14" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path className={styles.path} d="M0.900391 7.80542L3.90039 10.8054L13.9004 0.80542" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                    </span>
                </label>                 
            <span className={styles.text}>{todo.name}</span>
            <div className={styles.todoItem__details}>
                <Button>
                    <FaRegTrashCan size={20}/>
                </Button>
            </div>
        </div>
    );
};
