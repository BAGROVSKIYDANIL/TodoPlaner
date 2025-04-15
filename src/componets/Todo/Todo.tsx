import { useEffect, useState } from "react";
import { ToDoItem } from "./ToDoItem";
import styles from './Todo.module.scss'
import { CreateTask } from "../CreateTask/CreateTask";
import { CiFilter } from "react-icons/ci";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { ITodoItem, Status } from "../../types";
import Button from "../Button/Button";

export const ToDo = () => {
    const [todos, setTodos] = useState<ITodoItem[]>([])
    const [isOpenFilter, setIsOpenFilter] = useState<boolean>(false);
    const [isOpenStatusFilter, setIsOpeStatusFilter] = useState(false);
    const statusList:Status[] = ['todo', 'in progress', 'done'];
    useEffect(() =>{
        const storedTodos = localStorage.getItem('todo')
        if(storedTodos){
            try{
                const parsedTodos = JSON.parse(storedTodos);
                setTodos(parsedTodos);
            }
            catch (error){
                console.error("Ошибка при парсинге todos из localStorage:", error);
            }
        }
    }, [])

    const deleteTask = (id:number) => {
        setTodos(prev => {
            const taskList = [...prev];
            const index = prev.findIndex(item => item._id === id)
            if(index !== -1){
                taskList.splice(index, 1)
            }
            localStorage.setItem('todo', JSON.stringify(taskList));
            return taskList
        })
    }
    const editTask = (index: number, newName: string) => {
        setTodos(prev => {
            const editTaskList = prev.map((item, i) => i === index ? {...item, name: newName} : item)
            localStorage.setItem('todo', JSON.stringify(editTaskList));
            return editTaskList;
        })
    }
    const sortedPriorityTask = (arr:ITodoItem[], typeSort: string) => {
        const newList = [...arr]
        if(typeSort === 'Ascending'){
            newList.sort((a:ITodoItem, b:ITodoItem):number =>   {
                        if(a.priority != null && b.priority != null ){
                            return a.priority.num - b.priority.num
                        }
                        return 0
                })                
        }        
        if(typeSort === 'Descending'){
           newList.sort((a:ITodoItem, b:ITodoItem):number => {
                if(b.priority != null && a.priority != null){
                    return b.priority.num - a.priority.num
                }
                return 0
            })
        }       
        setTodos(newList)
    }
    const sortedStatusTask  = (arr: ITodoItem[], status: string[]) => {
        const storageList = localStorage.getItem('todo');
       const parsedTodos:ITodoItem[] = storageList != null ? JSON.parse(storageList) : null;

        const sortedList =  parsedTodos.map(item => {
            if(item.status != null){
                if(status.includes(item.status)){
                    return  item
                }
            }
            return undefined
        }).filter(item => item != null)
        setTodos(sortedList.length === 0 ? parsedTodos : sortedList )

    }
    
    return (
        <>
            <div className={styles.todoList}>
                <h1>Todo App</h1>
                <div className={styles.sorted}>
                    <div className={styles.sorted__status}>
                        <span className={styles.title}>Show tasks with status:</span>
                        <Button className="basic" onClick={() => setIsOpeStatusFilter(!isOpenStatusFilter)}>
                            <CiFilter size={20}/>
                        </Button>                        
                        <ul className={`${styles.sorted__wrapper} ${isOpenStatusFilter ? styles.active : ''}`}>
                            {statusList.map(status => (
                                <li className={styles.sorted__item} onClick={() => sortedStatusTask(todos, [status])}>{status}</li>
                            ))}
                        </ul>
                    </div>
                    <div className={styles.sorted__priority}>
                        <span className={styles.title}>Filter</span>
                        <Button className="basic" onClick={() => setIsOpenFilter(!isOpenFilter)}>
                            <CiFilter size={20}/>
                        </Button>
                        <ul className={`${styles.sorted__wrapper} ${isOpenFilter ? styles.active: ''}`}>
                            <li className={styles.sorted__item}>Priority<Button className="arrow"onClick={() => sortedPriorityTask(todos, 'Ascending')}><FaArrowUp  size={16}/></Button></li>
                            <li className={styles.sorted__item}>Priority<Button className="arrow"onClick={() => sortedPriorityTask(todos, 'Descending')}><FaArrowDown  size={16}/></Button></li>
                        </ul>                        
                    </div>
                </div>
                {todos.map(todo => 
                <ToDoItem 
                key={`_todo_${todo._id}`} 
                todo={todo}
                editTask={editTask}
                deleteTask={deleteTask}/>
                )}

            </div>    
            <CreateTask setTodos={setTodos}/>
        </>
    )
};
