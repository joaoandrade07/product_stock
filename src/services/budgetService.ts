import { Prisma } from "../generated/prisma/client";
import { IBudget } from "../interfaces/Budget"
import prisma from "../prisma"
import { notFound, ok } from "../utils/http-helper";

export const getAllBudgetsService = async () => {
    const budgets = await prisma.budget.findMany({
        include:{
            items:true
        }
    });
    return ok(budgets);
}

export const getBudgetByIdService = async (budgetId:string) => {
    const budget = await prisma.budget.findUnique({
        where:{
            id:budgetId
        },
        include:{
            items:true
        }
    });
    if(!budget) return notFound("Budget not found!");
    return ok(budget);
}

export const createBudgetService = async (budget: IBudget) => {

    const itemsId = budget.items.map(i=>i.productId);

    const products = await prisma.product.findMany({
        where:{
            id:{
                in:itemsId
            }
        }
    });

    const productsMap = new Map();
    products.forEach(p=> productsMap.set(p.id, p));

    let total = new Prisma.Decimal(0);

    const budgetItemsData = budget.items.map(item => {
        const product = productsMap.get(item.productId);

        const unitPrice = product.price;
        const subTotal = unitPrice.mul(item.quantity);

        total.plus(subTotal);

        return {
            productId:item.productId,
            quantity:item.quantity,
            subtotal: subTotal,
            unitPrice: unitPrice
        }
    });

    const data = await prisma.budget.create({
        data:{
            clientId:budget.clientId,
            items:{
                create: budgetItemsData
            },
            total:total,           
        },
        include:{
            items:true
        }
    });
}

export const deleteBudgetService = async (id:string) => {
    
}