import { ITodoItem } from "../../types";
export type SortType = 'order' | 'priority-asc' | 'priority-desc';
export interface ITodoItemProps{
    todo: ITodoItem;
    deleteTask: (index: string) => void;
    editTask: (i: string, newName: string) => void
    setTodos: (prev: ITodoItem[] | ((prev: ITodoItem[]) => ITodoItem[])) => void
    setActiveSort: (type: SortType) => void
}