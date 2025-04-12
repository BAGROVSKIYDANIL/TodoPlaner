import { useState } from "react";
import styles from './CreateTask.module.scss'
import Button from '../Button/Button';
import { FaPlus } from 'react-icons/fa6';
import { ITodo} from "./types";
import { Priority } from "../../types";

type Status = 'todo'|'in progress'| 'done' | null;
export const CreateTask = ({setTodos}: ITodo) => {
    const [name, setName] = useState<string>('');
    const [selectedStatus, setStatus] = useState<Status>(null);
    const [selectedPriority, setPriority] = useState<Priority | null>(null);
    const [isOpenDetails, setIsOpenDetails] = useState<boolean>(false)
    const statusList:Status[] = ['todo','in progress','done']
    const priorityList: Priority[] = ['low','medium', 'high']

    const onKeyPressNameHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {

        if (e.key === 'Enter'){
            if(name.trim() === '') return
            setTodos(prev => {
            const newTodos = [...prev, {_id: prev.length, name: name, isChecked: false, priority: selectedPriority}];
            localStorage.setItem('todo', JSON.stringify(newTodos));
            
            return newTodos;
            });
            setName('');
            setPriority(null)
        }
    }    

    const  handleSelectedDetailTask = (type: string ,detailsTask:Status | Priority) => {
        if(type === 'status'){
            setStatus(detailsTask as Status)
        }else{
            setPriority(detailsTask as Priority)
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
                <div className={styles.priorityWrapper}>
                    <span className={styles.title}>Select the task priority</span>
                    <ul className={styles.priority}>
                        {priorityList.map(priority =>(
                            <li 
                                className={`${styles.priority__item} ${selectedPriority === priority ? styles.selected : ''}`}
                                key={priority}
                                onClick={() => handleSelectedDetailTask('priority',priority)}
                                >{priority}</li>
                        ))}
                    </ul>                    
                </div>
                <div className={styles.statusWrapper}>
                    <div className={styles.title}>Select the task status</div>
                    <ul className={styles.statuses}>
                        {statusList.map(status => (
                            <li 
                                className={`${styles.statuses__item} ${selectedStatus === status ? styles.selected : ''}`}
                                key={status}
                                onClick={() => handleSelectedDetailTask('status',status)}>{status}</li>
                        ))}
                    </ul>
                </div>
                {/* <Button className="taskSave">Save</Button>          */}
            </div>    
        </>
    );
};
