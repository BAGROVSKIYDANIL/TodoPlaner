import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ToDoItem } from "./ToDoItem";
import styles from './Todo.module.scss'
import { CreateTask } from "../CreateTask/CreateTask";
import { CiFilter } from "react-icons/ci";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import { ITodoItem, Status } from "../../types";
import { useClickOutside } from "../../hooks/useClickOutside";
import Button from "../Button/Button";

export const ToDo = () => {
    const [todos, setTodos] = useState<ITodoItem[]>([])
    const [isOpenFilter, setIsOpenFilter] = useState<boolean>(false);
    const [isOpenStatusFilter, setIsOpeStatusFilter] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<Array <string>>([])
    const wrapperStatusListRef = useRef<HTMLUListElement>(null)
    const wrapperPriorityListRef = useRef<HTMLUListElement>(null)
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

    const deleteTask = useCallback((id:string) => {
        setTodos(prev => {
            const taskList = [...prev];
            const index = prev.findIndex(item => item._id === id)
            if(index !== -1){
                taskList.splice(index, 1)
            }
            localStorage.setItem('todo', JSON.stringify(taskList));
            return taskList
        })
    },[setTodos])

    const editTask = useCallback((index: string, newName: string) => {
        setTodos(prev => {
            const editTaskList = prev.map(item => item._id === index ? {...item, name: newName} : item)
            localStorage.setItem('todo', JSON.stringify(editTaskList));
            return editTaskList;
        })
    },[])

    const sortedPriorityTask = useCallback((arr:ITodoItem[], typeSort: string) => {
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
    },[])

    const handleStatusClick = useCallback((status: string) => {
        setSelectedStatus((prev: string[]) => {
            const statusList = [...prev]
            const index = prev.findIndex((item:string) => item === status)
            if(index !== -1){
                statusList.splice(index, 1)
            }
            else {
                statusList.push(status)
            }
            return statusList
        })
    },[])

    useEffect(() => {
        if(selectedStatus.length > 0){
                const storageList =localStorage.getItem('todo');
                const list:ITodoItem[] = storageList && JSON.parse(storageList)
                const sortedList = list.filter(item => {
                    if(item.status){
                        return selectedStatus.includes(item.status)
                    }
                });            
            setTodos(sortedList)
        }
        else {
            const storageList = localStorage.getItem('todo');
            const parsedTodos: ITodoItem[] = storageList != null ? JSON.parse(storageList) : [];
            setTodos(parsedTodos);
        }
    },[selectedStatus])

    const handleOpenStatusFilterClick = useCallback(() => {
        setIsOpeStatusFilter(prev => !prev);
    }, [setIsOpeStatusFilter]); 

    const handleOpenPriorityFilterClick = useCallback(() => {
        setIsOpenFilter(prev => !prev);
    }, [setIsOpenFilter]); 

    const handleSortAscending = useCallback(() => {
        sortedPriorityTask(todos, 'Ascending'); 
    }, [todos, sortedPriorityTask]); 

    const handleSortDescending = useCallback(() => {
        sortedPriorityTask(todos, 'Descending'); 
    }, [sortedPriorityTask, todos]); 

    useClickOutside({ref: wrapperStatusListRef, callBack: () => {
        if(isOpenStatusFilter) setTimeout(() => setIsOpeStatusFilter(false),50)
    }})
    useClickOutside({ref: wrapperPriorityListRef, callBack: () => {
        if(isOpenFilter) setTimeout(() => setIsOpenFilter(false),50)
    }})

    const filterIcon = useMemo(() => <CiFilter size={20}/>, []);
    const arrowUpIcon = useMemo(() => <FaArrowUp size={16}/>, []);
    const arrowDownIcon = useMemo(() => <FaArrowDown size={16}/>, []);

    return (
        <>
            <div className={styles.todoList}>
                <h1>Todo App</h1>
                <div className={styles.sorted}>
                    <div className={styles.sorted__status}>
                        <span className={styles.title}>Show tasks with status:</span>
                        <Button className="basic" onClick={handleOpenStatusFilterClick}>
                            {filterIcon}
                        </Button>                        
                        <ul ref={wrapperStatusListRef} className={`${styles.sorted__wrapper} ${isOpenStatusFilter ? styles.active : ''}`}>
                            {statusList.map((status, index) => (
                                <li className={styles.sorted__item} onClick={() => handleStatusClick(status)}>
                                    {status}
                                    {selectedStatus[index] === status && <IoCloseOutline />}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={styles.sorted__priority}>
                        <span className={styles.title}>Filter</span>
                        <Button className="basic" onClick={handleOpenPriorityFilterClick}>
                            {filterIcon}
                        </Button>
                        {isOpenFilter &&
                        <ul ref={wrapperPriorityListRef} className={`${styles.sorted__wrapper} ${isOpenFilter ? styles.active: ''}`}>
                            <li className={styles.sorted__item}>Priority<Button className="arrow"onClick={handleSortAscending}>{arrowUpIcon}</Button></li>
                            
                            <li className={styles.sorted__item}>Priority <Button className="arrow"onClick={handleSortDescending}>{arrowDownIcon}</Button></li>
                           
                        </ul>                                
                        }
                    </div>
                </div>
                {todos.map(todo => 
                <ToDoItem 
                key={`_todo_${todo._id}`} 
                todo={todo}
                editTask={editTask}
                deleteTask={deleteTask}
                />
                )}
            </div>    
            <CreateTask setTodos={setTodos}/>
        </>
    )
};
