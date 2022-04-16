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
    //Configuration name
    name: string;
    //Filters where site settings should be appliced
    filters: chrome.events.UrlFilter[];
    //component settings
    components: Components;
    //styles to be separately injected
    styles: string;
    //selector that defines where the comment box is to inject additional UI there.
    selector: string;
    //green area selectors where additional UI SHOULD be injected.
    greenAreas: string[];
}

export type Components = {
    container: any;
    button: ButtonSettings;
    selection: any;
}

export interface ButtonSettings {
    classes: string;
    placeholderClasses: string;
    icon: IconSettings;
}

export interface IconSettings {
    enabled: boolean;
    //default state icon class
    default: string;
    //selected state icon class. If not set, default is used.
    selected?: string;
    //icon additional classes
    classes: string;
}

