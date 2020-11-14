export interface Country {
    name?: string;
    code?: string;
}

export interface Representative {
    name?: string;
    image?: string;
}

export interface Summary {
    region? : string;
    city?:string;
    hospitals?: number;
    schools?: number;
    colleges?: number;
    companies?: number;
}