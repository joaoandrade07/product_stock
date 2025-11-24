import { NextFunction, Request, Response } from "express";
import { Role } from "../../generated/prisma";
import { HttpStatus } from "../../utils/http-status";

export const authorizeRole = (roles: Role[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if(!req.user) return res.status(HttpStatus.UNAUTHORIZED).json("Unauthenticated user");
        if(!roles.includes(req.user.role)) return res.status(HttpStatus.FORBIDDEN).json("Unauthorized user");
        next();
    }
}