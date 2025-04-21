import { memo, useCallback, useMemo, useState, useRef } from "react";
import styles from './CreateTask.module.scss'
import Button from '../Button/Button';
import { FaPlus } from 'react-icons/fa6';
import { ITodo} from "./types";
import { PriorityType, Priority,Status } from "../../types";
import { useClickOutside } from "../../hooks/useClickOutside";

export const CreateTask = memo(({setTodos}: ITodo) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const wrapperDetailTaskRef = useRef<HTMLDivElement>(null)
    const textAreaRef = useRef<HTMLTextAreaElement>(null)
    const [selectedStatus, setStatus] = useState<Status | null>(null);
    const [selectedPriority, setPriority] = useState<Priority | null>(null);
    const [isOpenDetails, setIsOpenDetails] = useState<boolean>(false)
    const statusList:Status[] = ['todo','in progress','done']
    const priorityList: PriorityType[] = ['low','medium', 'high']

    useClickOutside({ref: wrapperDetailTaskRef, callBack: () => {
        if(isOpenDetails) setTimeout(() => setIsOpenDetails(false),50)
    }})
    const handleCreateTask = useCallback(() => {
            if(inputRef.current?.value.trim() === '') return
            if(inputRef.current && textAreaRef.current){
                const tile = inputRef.current.value;
                const description = textAreaRef.current.value
                setTodos(prev => {
                const newTodos = [...prev, {
                    _id:  Math.random().toString(36).substr(2, 9), 
                    name: tile, 
                    order: prev.length + 1,
                    isChecked: false, 
                    priority: selectedPriority, 
                    status: selectedStatus, 
                    description: description}];
                localStorage.setItem('todo', JSON.stringify(newTodos));
                return newTodos;
                });
                inputRef.current.value = ''
                textAreaRef.current.value =''
                setPriority(null)
                setStatus(null)                
            }                
    },[setTodos,selectedPriority,selectedStatus])  

    const  handleSelectedDetailTask = useCallback((type:string ,detailsTask:Status | PriorityType, numPriority: number) => {
        if(type === 'status'){
            setStatus(detailsTask as Status)
        }else{
            setPriority({type:detailsTask as PriorityType, num: numPriority})
        }
    },[])

    const openDetails = useCallback(() => setIsOpenDetails(prev => !prev), [])

    return (
        <>
            <div className={styles.newTask}>
                    <Button onClick={openDetails}>
                        {useMemo(() =>  <FaPlus color="black" />,[])}
                    </Button>
                    <span className={styles.newTask__title}>Create new task</span>
            </div>    
            {isOpenDetails &&
                <div ref={wrapperDetailTaskRef} className={`${styles.detailsTask} ${isOpenDetails ? styles.active: ''}`}>
                    <div className={styles.detailsTask__createWrapper}>
                        <input 
                            className={styles.newTask__input} 
                            ref={inputRef}
                            type="text" 
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
                                ref={textAreaRef} 
                                placeholder="Enter a description task" 
                                className={styles.description__item}
                                />                       
                        </div>
                    </div>
                    <Button className="taskSave" onClick={handleCreateTask}>Create</Button>         
                </div>               
            }
        </>
    );
}, (prevProps, nextProps) => {
    return(
        prevProps.setTodos === nextProps.setTodos
    )
});
