export interface Product{
    id:number;
    title:string;
    image:string;
    price:number;
    originalPrice?:number;
    discount?:number;
    details:string;
}