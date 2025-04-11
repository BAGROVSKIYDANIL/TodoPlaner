export interface ITodoItem {
    _id: number;
    name: string;
    isChecked: boolean;
    priority: string;
    status?: string;
}
export interface IProps{
    todo: ITodoItem;
}
