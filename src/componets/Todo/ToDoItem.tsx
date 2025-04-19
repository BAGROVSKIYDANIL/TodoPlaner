import styles from './Todo.module.scss'
import { PriorityType, Status } from '../../types';
import { FaRegTrashCan, FaCheck } from "react-icons/fa6";
import { MdModeEditOutline } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState, useRef, memo, useCallback, useMemo, useEffect } from 'react';
import { useClickOutside } from '../../hooks/useClickOutside';
import Button from '../Button/Button';
import { ITodoItemProps } from './TodoInreface';

export const ToDoItem:React.FC<ITodoItemProps> = memo(({todo, deleteTask, editTask}) => {
    const [isChecked, setIsChecked] = useState(false);
    const [isEditTask, setIsEditTask] = useState<boolean>(false)
    const [showDescription, setShowDescription] = useState<boolean>(false)    
    const descriptionRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const priorityClasses: Record<PriorityType, string>  = {
        high: styles.priorityHigh,
        medium: styles.priorityMedium,
        low: styles.priorityLow,
        }
    const statusesClasses: Record<Status, string> = {
        todo: styles.todo,
        "in progress": styles.inProgress,
        done: styles.done
    }

    useClickOutside({ref: descriptionRef, callBack: () => {
        if (showDescription) setTimeout(() => setShowDescription(false), 50)
    }})
    const handleCheckboxChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) =>
    {
        e.stopPropagation()
            const checked = e.target.checked;
            setIsChecked(checked)
    },[])

    const successEditMessage = useCallback(() => {
            
            if(inputRef.current){
                const newText = inputRef.current.value.trim();
                if (newText !== ''){
                editTask(todo._id, inputRef.current.value)
                }
                setIsEditTask(false)
            }
            else{
                setIsEditTask(false)
            }
    },[todo._id, editTask])

    useEffect(() => {
        if(inputRef.current && isEditTask){
            inputRef.current.value = todo.name
        }
    },[isEditTask, todo.name])
    
    const handleShowDescription = useCallback(() => setShowDescription(prev => !prev),[])
    const iconEye = useMemo(() =>  <FaEye size={18}/>, [])
    const iconEdit = useMemo(() => <MdModeEditOutline size={20}/>,[])
    const iconTrashCan = useMemo(() => <FaRegTrashCan size={20}/>,[])
    return (
        <>
            <div className={styles.todoItem}>
                    <label key={todo._id} className={styles.checkbox} onClick={(e) => e.stopPropagation()}>
                        <input className={styles.checkbox__input} type="checkbox"  onChange={handleCheckboxChange} checked={isChecked}/>
                        <span className={styles.checkbox__indicator}>
                            <svg className={styles.checkbox__indicator_active} width="17" height="14" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path className={styles.path} d="M0.900391 7.80542L3.90039 10.8054L13.9004 0.80542" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                        </span>
                    </label>                 
                    {isEditTask ?
                        <>
                            <input
                                ref={inputRef}
                                type="text"
                                className={styles.editInput}
                                autoFocus/>                      
                            <Button onClick={() => successEditMessage()}>
                                <FaCheck size={20} color='#00FF00'/>
                            </Button>                    
                        </>
                        :
                        <div className={styles.infoTask}>
                            <span className={styles.infoTask__text}>{todo.name}</span>|
                            <div className={styles.infoTask__description}>
                                {todo.description &&
                                    <>
                                        Desctiption:  
                                        <Button className='basic' onClick={handleShowDescription}>
                                        {iconEye}
                                        </Button>                                
                                    </>                                
                                }
                            </div>
                        </div>
                    }
                    <div className={styles.detailsTask}>
                        <span className={`${styles.detailsTask__status} ${ todo.status != null ? statusesClasses[todo.status] : ''}`}>{todo.status}</span>
                        <span className={`${styles.detailsTask__priority} ${todo.priority != null ? priorityClasses[todo.priority.type] : ''}`}>{todo.priority?.type}</span>
                        <Button className='basic' onClick={() => setIsEditTask(true)}>
                            {iconEdit}
                        </Button>
                        <Button className='basic' onClick={() => deleteTask(todo._id)}>
                            {iconTrashCan}
                        </Button>
                        <Button className='basic' >
                            <BsThreeDotsVertical size={20}/>
                        </Button>
                    </div>
                    {showDescription &&
                        <div ref={descriptionRef} className={styles.description}>{todo.description}</div>                    
                    }
            </div>     

        </>
    );
}, (prevProps, nextProps) => {
    return(
    prevProps.todo === nextProps.todo &&
    prevProps.deleteTask === nextProps.deleteTask &&
    prevProps.editTask === nextProps.editTask        
    )
});
