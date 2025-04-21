import { ITodoItem } from "../../types";

export interface ITodoItemProps{
    todo: ITodoItem;
    deleteTask: (index: string) => void;
    editTask: (i: string, newName: string) => void
    setTodos: (prev: ITodoItem[] | ((prev: ITodoItem[]) => ITodoItem[])) => void
}