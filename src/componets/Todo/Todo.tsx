import { useEffect, useState } from "react";
import { ToDoItem } from "./ToDoItem";
import styles from './Todo.module.scss'
import { CreateTask } from "../CreateTask/CreateTask";
import { ITodoItem } from "../../types";

export const ToDo = () => {
    const [todos, setTodos] = useState<ITodoItem[]>([])

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
    return (
        <>
            <div className={styles.todoList}>
                <h1>Todo App</h1>
                {todos.map(todo => <ToDoItem key={`_todo_${todo._id}`} todo={todo}/>)}

            </div>    
            <CreateTask setTodos={setTodos}/>
        </>
    )
};
