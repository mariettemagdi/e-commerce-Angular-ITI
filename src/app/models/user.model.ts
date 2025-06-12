export interface User {
    id:number;
    username:string;
    email:string;
    password?:string;
    imageUrl?:string;
    gender?:'male' | 'female';
    createdAt:Date;
    updatedAt:Date;
    role:'user' | 'admin';
    token?:string;
    // language:string;


}