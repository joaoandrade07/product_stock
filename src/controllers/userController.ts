import { Request, Response, json } from "express";
import { createUserService, getAllUsersService, getUserByIdService } from "../services/userService";
import { IUserModel } from "../interfaces/User";

export const getAllUsersController = async(req: Request, res: Response) => {
    const users = await getAllUsersService();
    res.status(users.statusCode).json(users.body);
}

export const getUserByIdController = async(req: Request, res: Response) => {
    const id = req.params.id;
    const data = await getUserByIdService(id);
    return res.status(data.statusCode).json(data.body);
}

export const createUserController = async (req:Request, res:Response) => {
    const user:IUserModel = req.body;
    const data = await createUserService(user);
    return res.status(data.statusCode).json(data.body);
}