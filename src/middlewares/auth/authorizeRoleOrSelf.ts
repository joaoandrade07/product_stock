import { Request, Response,NextFunction } from "express";
import { Role } from "../../generated/prisma";
import { HttpStatus } from "../../utils/http-status";

export const authorizeRoleOrSelf = (roles: Role[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        if(!req.user) return res.status(HttpStatus.UNAUTHORIZED).json("Unauthenticated user");
        if(!roles.includes(req.user.role) && req.user.id !== id) return res.status(HttpStatus.FORBIDDEN).json("Unauthorized user");
        next();
    }
}