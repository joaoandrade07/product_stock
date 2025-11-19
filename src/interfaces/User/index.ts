import { Role } from "../../generated/prisma";

export interface IUserModel {
    name: string;
    email: string;
    password: string;
    role: Role
}