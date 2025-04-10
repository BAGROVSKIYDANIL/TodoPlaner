export interface ITodoItem {
    _id: number;
    name: string;
    isChecked: boolean
}
export interface IProps{
    todo: ITodoItem;
}
