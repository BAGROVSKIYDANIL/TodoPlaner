import { useState } from "react";
import styles from './CreateTask.module.scss'
import Button from '../Button/Button';
import { FaPlus } from 'react-icons/fa6';
import { ITodo} from "./types";
import { PriorityType, Priority,Status } from "../../types";

export const CreateTask = ({setTodos}: ITodo) => {
    const [name, setName] = useState<string>('');
    const [selectedStatus, setStatus] = useState<Status | null>(null);
    const [selectedPriority, setPriority] = useState<Priority | null>(null);
    const [isOpenDetails, setIsOpenDetails] = useState<boolean>(false)
    const [description, setDescription] = useState<string | null>(null)
    const statusList:Status[] = ['todo','in progress','done']
    const priorityList: PriorityType[] = ['low','medium', 'high']


    const handleCreateTask = () => {

            if(name.trim() === '') return
            setTodos(prev => {
            const newTodos = [...prev, {_id: prev.length, name: name, isChecked: false, priority: selectedPriority, status: selectedStatus, description: description}];
            localStorage.setItem('todo', JSON.stringify(newTodos));
            
            return newTodos;
            });
            setName('');
            setPriority(null)
            setStatus(null)
    }    

    const  handleSelectedDetailTask = (type:string ,detailsTask:Status | PriorityType, numPriority: number) => {
        if(type === 'status'){
            setStatus(detailsTask as Status)
        }else{
            setPriority({type:detailsTask as PriorityType, num: numPriority})
        }
    }
    const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.currentTarget.value;
        setDescription(value)
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
                        placeholder="Create new task title" 
                    />                       
                </div>     
                <div className={styles.priorityWrapper}>
                    <span className={styles.title}>Select the task priority</span>
                    <ul className={styles.priority}>
                        {priorityList.map((priority, index) =>(
                            <li 
                                className={`${styles.priority__item} ${selectedPriority?.type === priority ? styles.selected : ''}`}
                                key={priority}
                                onClick={() => handleSelectedDetailTask('priority',priority, index + 1)}
                                >{priority}</li>
                        ))}
                    </ul>                    
                </div>
                <div className={styles.statusWrapper}>
                    <div className={styles.title}>Select the task status</div>
                    <ul className={styles.statuses}>
                        {statusList.map((status, index) => (
                            <li 
                                className={`${styles.statuses__item} ${selectedStatus === status ? styles.selected : ''}`}
                                key={status}
                                onClick={() => handleSelectedDetailTask('status',status, index + 1)}>{status}</li>
                        ))}
                    </ul>
                </div>
                <div className={styles.description}>
                    <span className={styles.title}>Enter a description task:</span>
                    <div className={styles.description__wrapper}>
                        <textarea 
                            placeholder="Enter a description task" 
                            className={styles.description__item}
                            onChange={(e) => handleTextAreaChange(e)}
                            value={description ?? ''}/>                       
                    </div>
                </div>
                <Button className="taskSave" onClick={handleCreateTask}>Create</Button>         
            </div>    
        </>
    );
};
