import { Role } from "../../generated/prisma";

export interface IJwtPayload {
    id: string;
    role: Role;
}