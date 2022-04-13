// data
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

// tslint:disable-next-line: interface-name
export interface ConventionalCommentMatch {
    label: IItem;
    decorations: IItem[];
}

export function EmptyMatch(): ConventionalCommentMatch {
    return {
        label: null,
        decorations: []
    }
}

export interface Site {
    name: string;
    filters: chrome.events.UrlFilter[];
    components: any[];
    additionalStyles: string;
}

export interface ComponentStyle {
    name: string;
    classes: string;
    styles: string;
    additionalClasses: string;
}