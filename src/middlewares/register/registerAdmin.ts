import { NextFunction, Request, Response } from "express";
import { IUserModel } from "../../interfaces/User";
import { Role } from "../../generated/prisma";
import { HttpStatus } from "../../utils/http-status";

export const registerAdmin = (req: Request, res: Response, next: NextFunction) => {
    const user: IUserModel = req.body;
    if(user.role == Role.ADMIN && req.user?.role !== Role.ADMIN){
        return res.status(HttpStatus.UNAUTHORIZED).json("Unauthorized!");
    }
    next();
}