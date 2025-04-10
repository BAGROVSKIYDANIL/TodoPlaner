import { ITodoItem } from "../../types";

export interface ITodo{
    setTodos: (prev: ITodoItem[] | ((prev: ITodoItem[]) => ITodoItem[])) => void
}