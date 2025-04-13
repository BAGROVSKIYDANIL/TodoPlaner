import { useEffect, useState } from "react";
import { ToDoItem } from "./ToDoItem";
import styles from './Todo.module.scss'
import { CreateTask } from "../CreateTask/CreateTask";
import { CiFilter } from "react-icons/ci";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { ITodoItem } from "../../types";
import Button from "../Button/Button";

export const ToDo = () => {
    const [todos, setTodos] = useState<ITodoItem[]>([])
    const [isOpenFilter, setIsOpenFilter] = useState<boolean>(false);
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
    const test = [1]
    console.log(test.splice(1, 1))
    return (
        <>
            <div className={styles.todoList}>
                <h1>Todo App</h1>
                <div className={styles.sorted}>
                    <span className={styles.title}>Filter</span>
                    <Button className="basic" onClick={() => setIsOpenFilter(!isOpenFilter)}>
                        <CiFilter size={20}/>
                    </Button>
                    <ul className={`${styles.sorted__wrapper} ${isOpenFilter ? styles.active: ''}`}>
                        <li className={styles.sorted__item}>Status<Button className="arrow"><FaArrowUp  size={16}/></Button></li>
                        <li className={styles.sorted__item}>Status<Button className="arrow"><FaArrowDown  size={16}/></Button></li>
                        <li className={styles.sorted__item}>Priority<Button className="arrow"><FaArrowUp  size={16}/></Button></li>
                        <li className={styles.sorted__item}>Priority<Button className="arrow"><FaArrowDown  size={16}/></Button></li>
                    </ul>
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
