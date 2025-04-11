export interface ITodoItem {
    _id: number;
    name: string;
    isChecked: boolean;
    priority: string | null;
    status?: string | null;
}
export interface IProps{
    todo: ITodoItem;
}
