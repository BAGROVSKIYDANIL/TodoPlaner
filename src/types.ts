
export type PriorityType = 'low'|'medium'|'high'
export type Status = 'todo'|'in progress'| 'done'
export type Priority = {
    type: PriorityType,
    num: number
}
export interface ITodoItem {
    _id: string;
    name: string;
    order: number;
    isChecked: boolean;
    priority?: Priority | null;
    status?: Status | null;
    description: string | null;
}
export interface IProps{
    todo: ITodoItem;
}
