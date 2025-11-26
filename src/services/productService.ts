import { IProduct } from "../interfaces/Product";
import prisma from "../prisma"
import { badRequest, created, noContent, notFound, ok } from "../utils/http-helper";

export const getAllProductsService = async () => {
    const budgets = await prisma.product.findMany({
        omit: {
            createdAt: true,
            updatedAt: true
        }
    });
    return ok(budgets);
}

export const getProductByIdService = async (id: string) => {
    const product = await prisma.product.findUnique({
        where: {
            id: id
        },
        omit: {
            createdAt: true,
            updatedAt: true
        }
    });
    if (!product) return notFound();
    return ok(product);
}

export const createProductService = async (product: IProduct) => {
    try {
        const data = await prisma.product.create({
            data: {
                name: product.name,
                price: product.price,
                description: product.description,
                stock: product.stock
            },
            omit: {
                createdAt: true,
                updatedAt: true
            }
        });
        return created(data);
    } catch (error) {
        return badRequest("Error when creating product!")
    }
}

export const deleteProductService = async (id: string) => {
    const data = await prisma.product.delete({
        where: {
            id: id
        }
    });
    return noContent();
}