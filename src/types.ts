export type Priority = 'low'|'medium'|'high' 
export interface ITodoItem {
    _id: number;
    name: string;
    isChecked: boolean;
    priority: Priority | null;
    status?: string | null;
}
export interface IProps{
    todo: ITodoItem;
}
