import { Prisma } from "../../generated/prisma/client";

export interface IProduct {
    name:string;
    description?:string;
    price:Prisma.Decimal;     
    stock:number;
}