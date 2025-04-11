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

    const deleteTask = (index:number) => {
        setTodos(prev => {
            const taskList = [...prev];
            taskList.splice(index, 1)
            localStorage.setItem('todo', JSON.stringify(taskList));
            return taskList
        })
    }
    return (
        <>
            <div className={styles.todoList}>
                <h1>Todo App</h1>
                {todos.map(todo => 
                <ToDoItem 
                key={`_todo_${todo._id}`} 
                todo={todo}
                deleteTask={deleteTask}/>
                )}

            </div>    
            <CreateTask setTodos={setTodos}/>
        </>
    )
};
