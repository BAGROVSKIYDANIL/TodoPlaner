import { useState } from "react";
import styles from './CreateTask.module.scss'
import Button from '../Button/Button';
import { FaPlus } from 'react-icons/fa6';
import { ITodo } from "./types";

export const CreateTask = ({setTodos}: ITodo) => {
    const [name, setName] = useState<string>('');
    const [status, setStatus] = useState<'todo'|'in progress'| 'done'>();
    const [priority, setPriority] = useState<'low' | 'medium' | 'high'>();
    const [isOpenDetails, setIsOpenDetails] = useState<boolean>(false)

    const onKeyPressNameHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {

        if (e.key === 'Enter'){
            if(name.trim() === '') return
            setTodos(prev => {
            const newTodos = [...prev, {_id: prev.length, name: name, isChecked: false}];
            localStorage.setItem('todo', JSON.stringify(newTodos));
            return newTodos;
            });
            setName('')
        }
    }    

    return (
        <>
            <div className={styles.newTask}>
                    <Button onClick={() => setIsOpenDetails(!isOpenDetails)}>
                        <FaPlus color="black"/>
                    </Button>
                    <span className={styles.newTask__title}>Create new task</span>
            </div>    
            <div className={`${styles.detailsTask} ${isOpenDetails ? styles.active: ''}`}>
                <div className={styles.detailsTask__createWrapper}>
                    <input 
                        className={styles.newTask__input} 
                        type="text" 
                        value={name} 
                        onChange={e => setName(e.target.value)}
                        onKeyDown={onKeyPressNameHandler}
                        placeholder="Create new task" 
                    />                       
                </div>     
                <div className={styles.statusesWrapper}>
                    <span className={styles.title}>Select the task status</span>
                    <ul className={styles.statuses}>
                        <li className={styles.statuses__item}>todo</li>
                        <li className={styles.statuses__item}>in progress</li>
                        <li className={styles.statuses__item}>done</li>
                    </ul>                    
                </div>
                {/* <Button className="taskSave">Save</Button>          */}
            </div>    
        </>
    );
};
