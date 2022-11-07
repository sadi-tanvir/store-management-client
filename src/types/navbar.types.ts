
export type LinkType = {
    isActive: boolean;
}

export interface ActiveStyleType {
    color?: string;
    margin?: string;
    backgroundColor?: string;
    padding?: string;
    borderRadius?: string;
    boxShadow?: string;
    transition?: string;
    fontWeight?: string;
    textAline?: string;
}

export interface NavListType {
    key: number;
    title: string;
    path: string;
}