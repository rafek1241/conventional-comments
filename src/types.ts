export interface IItem {
    label: string;
    value: string;
    icon: string;
    description: string;
}

export interface IOptions {
    labels: IItem[];
    decorations: IItem[];

}
