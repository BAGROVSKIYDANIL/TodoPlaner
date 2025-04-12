export type Priority = 'low'|'medium'|'high' 
export type Status = 'todo'|'in progress'| 'done'
export interface ITodoItem {
    _id: number;
    name: string;
    isChecked: boolean;
    priority: Priority | null;
    status?: Status | null | undefined;
}
export interface IProps{
    todo: ITodoItem;
}
