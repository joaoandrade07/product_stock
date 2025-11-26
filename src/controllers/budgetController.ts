import { Request, Response } from "express";
import { IBudget } from "../interfaces/Budget";
import { createBudgetService, deleteBudgetService, getAllBudgetsService, getBudgetByIdService } from "../services/budgetService";

export const getAllBudgetsController = async (req: Request, res: Response) => {
    const budgets = await getAllBudgetsService();
    res.status(budgets.statusCode).json(budgets.body);
}

export const getBudgetByIdController =async (req: Request, res: Response) => {
    const id = req.params.id;
    const budget = await getBudgetByIdService(id);
    res.status(budget.statusCode).json(budget.body);
}

export const createBudgetController = async (req: Request, res: Response) => {
    const budget:IBudget = req.body;
    const data = await createBudgetService(budget);
    res.status(data.statusCode).json(data.body);
}

export const deleteBudgetController = async (req:Request, res: Response) => {
    const budgetId = req.params.id;
    const budget = await deleteBudgetService(budgetId);
    res.status(budget.statusCode).json();
}