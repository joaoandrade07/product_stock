import { User } from "../generated/prisma";
import { IUserModel } from "../interfaces/User";
import prisma from "../prisma";
import { badRequest, created, noContent, notFound, ok } from "../utils/http-helper";
import bcrypt from 'bcrypt';

export const getAllUsersService = async () => {
    const users = await prisma.user.findMany();
    return ok(users);
}

export const getUserByIdService = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: { id: id },
        omit: { password: true }
    });
    if (!user) return notFound();
    return ok(user);
}

export const createUserService = async (user: IUserModel) => {
    try {
        const userExists = await prisma.user.findUnique({ where: { email: user.email } });
        if (userExists || userExists != undefined) return badRequest("Erro ao realizar cadastro. Tente novamente.");
        const passwordHash = await bcrypt.hash(user.password, 10);
        const data = await prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: passwordHash,
                role: user.role
            },
            omit: { password: true }
        });
        return created(data);
    } catch (error) {
        console.error(error);
        return badRequest("Error ao realizar cadastro. Tente novamente.");
    }
}

export const deleteUserService = async (id: string) => {
    const userExists = await prisma.user.findUnique({
        where: { id: id }
    });
    if (!userExists) return noContent();
    const data = await prisma.user.delete({
        where: { id: id }
    });
    return noContent();
}