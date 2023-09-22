export class Chat {
    message: string;
    name: string;
    date: string;
    uid?: string;

    constructor(message: string, name: string, date:string, uid:string)
    {
        this.message = message;
        this.name = name;
        this.date = date;
        this.uid = uid;
     }
}
