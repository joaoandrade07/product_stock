import { User } from "../generated/prisma";
import { IUserModel } from "../interfaces/User";
import prisma from "../prisma";
import { created, noContent, notFound, ok } from "../utils/http-helper";

export const getAllUsersService = async () => {
    const users = await prisma.user.findMany();
    return ok(users);
}

export const getUserByIdService = async (id:string) => {
    const user = await prisma.user.findUnique({
        where: {id: id},
        omit:{password:true}
    });
    if(!user) return notFound();
    return ok(user);
}

export const createUserService = async (user: IUserModel) => {
    const data = await prisma.user.create({
        data: {
            name: user.name,
            email: user.email,
            password: user.password,
            role: user.role
        },
        omit: {password:true}
    });
    return created(data);
}

export const deleteUserService = async (id: string) => {
    const userExists = await prisma.user.findUnique({
        where: {id:id}
    });
    if(!userExists) return noContent();
    const data = await prisma.user.delete({
        where: {id:id}
    });
    return noContent();
}