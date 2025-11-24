import { Request, Response } from "express";
import { ILogin } from "../interfaces/Login";
import { loginService } from "../services/loginService";

export const loginController = async (req: Request, res: Response) => {
    const login: ILogin = req.body;
    const data = await loginService(login);
    res.status(data.statusCode).json(data.body);
}