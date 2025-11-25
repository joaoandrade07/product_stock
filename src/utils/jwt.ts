import jwt from "jsonwebtoken";
import { IJwtPayload } from "../interfaces/Jwt";

export const generateToken = (user: IJwtPayload) => {
    return jwt.sign(
        {id: user.id, role: user.role},
        process.env.JWT_SECRET as string
    );
}

export const generateExpiringToken = (user:IJwtPayload, hours:number = 3) => {
    return jwt.sign(
        {id: user.id, role: user.role},
        process.env.JWT_SECRET as string,
        {expiresIn: `${hours}h`}
    );
}