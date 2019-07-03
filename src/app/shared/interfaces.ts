export interface User {
    id?: number;
    login: string;
    password: string;
    organization?: string;
}

export class Message {
    constructor(public  type: string,
                public  text: string) {
    }
}
