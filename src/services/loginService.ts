import { ILogin } from "../interfaces/Login";
import prisma from "../prisma";
import { notFound, ok } from "../utils/http-helper";
import { generateToken } from "../utils/jwt";
import bcrypt from "bcrypt";

export const loginService = async (login: ILogin) => {
    const user = await prisma.user.findUnique({ where: { email: login.email } });
    if (!user) return notFound("User or password are wrongs!");

    const isValid = await bcrypt.compare(login.password, user.password);
    // const isValid = login.password == user.password ? true : false;
    if (!isValid) return notFound("User or password are wrongs!");

    const token = generateToken({ id: user.id, role: user.role });
    return ok(token);
}