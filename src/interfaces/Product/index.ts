import { Prisma } from "../../generated/prisma/client";

export interface IProduct {
    id:string;   
    name:string;
    description?:string;
    price:Prisma.Decimal;     
    stock:number;
}