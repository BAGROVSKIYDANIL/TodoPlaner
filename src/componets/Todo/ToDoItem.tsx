import styles from './Todo.module.scss'
import { PriorityType, Status } from '../../types';
import { FaRegTrashCan } from "react-icons/fa6";
import { MdModeEditOutline } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from 'react';
import Button from '../Button/Button';
import { ITodoItemProps } from './inreface';

export const ToDoItem:React.FC<ITodoItemProps> = ({todo, deleteTask, editTask}) => {
    const [isChecked, setIsChecked] = useState(false);
    const [isEditTask, setIsEditTask] = useState<boolean>(false)
    const [textFiled, setTextFiled] = useState<string>('')
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
    
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    {
        e.stopPropagation()
            const checked = e.target.checked;
            setIsChecked(checked)
    }
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => 
    {
        setTextFiled(e.target.value);
    };        
    const handleEditMesage = () => {
        setTextFiled(todo.name)
        setIsEditTask(true)
    }
    const successEditMessage = () => {
            setIsEditTask(false)
            editTask(todo._id, textFiled)
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
                {isEditTask ?
                    <>
                        <input
                            type="text"
                            className={styles.editInput}
                            value={textFiled}
                            onChange={handleInputChange}
                            autoFocus/>                      
                        <Button onClick={() => successEditMessage()}>
                            <FaCheck size={20} color='#00FF00'/>
                        </Button>                    
                    </>
                    :
                    <span className={styles.text}>{todo.name}</span>
                }
                <div className={styles.detailsTask}>
                    <span className={`${styles.detailsTask__status} ${ todo.status != null ? statusesClasses[todo.status] : ''}`}>{todo.status}</span>
                    <span className={`${styles.detailsTask__priority} ${todo.priority != null ? priorityClasses[todo.priority.type] : ''}`}>{todo.priority?.type}</span>
                    <Button className='basic' onClick={() => handleEditMesage()}>
                        <MdModeEditOutline size={20}/>
                    </Button>
                    <Button className='basic' onClick={() => deleteTask(todo._id)}>
                        <FaRegTrashCan size={20}/>
                    </Button>
                    <Button className='basic' >
                        <BsThreeDotsVertical size={20}/>
                    </Button>
                </div>
        </div>
    );
};
