import { IbudgetItem } from "../interfaces/BudgetItem/intex";
import prisma from "../prisma";
import { notFound } from "../utils/http-helper";

export const updateBudgetItemService = async (id:string, budgetItem: IbudgetItem) => {
    const item = await prisma.budgetItem.findUnique({
        where:{
            id:id
        },
        include:{
            product:true
        }
    });
    if(!item) return notFound("Item not found!");
}