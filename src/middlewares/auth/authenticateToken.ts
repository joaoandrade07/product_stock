import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../../utils/http-status";
import jwt from "jsonwebtoken";
import { IJwtPayload } from "../../interfaces/Jwt";

declare module "express-serve-static-core" {
    interface Request {
        user?: IJwtPayload;
    }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(" ")[1];
        if(!token) return res.status(HttpStatus.UNAUTHORIZED).json("Missing Token");
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as IJwtPayload;
        req.user = decoded;
        next();
    }catch(error:any) {
        if(error.name == "TokenExpiredError") return  res.status(HttpStatus.UNAUTHORIZED).json("Expired Token");
        return res.status(HttpStatus.FORBIDDEN).json("Invalid Token");
    }
}