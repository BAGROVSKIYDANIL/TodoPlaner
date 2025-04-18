import { ITodoItem } from "../../types";

export interface ITodoItemProps{
    todo: ITodoItem;
    deleteTask: (index: number) => void;
    editTask: (i: number, newName: string) => void
}