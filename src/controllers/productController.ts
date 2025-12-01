import { Request, Response } from "express"
import { IProduct } from "../interfaces/Product"
import { createProductService, getAllProductsService } from "../services/productService";

export const getAllProductsController =async (req:Request, res:Response) => {
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const products = await getAllProductsService(page, limit);
    res.status(products.statusCode).json(products.body);
}

export const createProductController = async (req: Request, res: Response) => {
    const product: IProduct = req.body;
    const data = await createProductService(product);
    res.status(data.statusCode).json(data.body);
}