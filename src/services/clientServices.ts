import { IClient } from "../interfaces/Clients"
import prisma from "../prisma"
import { created, notFound, ok } from "../utils/http-helper"


export const getAllClientsService = async () => {
    const users = await prisma.client.findMany({
        omit: {
            createdAt:true,
            updatedAt: true,
        }
    });
    return ok(users);
}

export const getClientByIdService = async (id: string) => {
    const user = await prisma.client.findUnique({
        where: {
            id:id
        },
        omit: {
            id:true,
            createdAt:true,
            updatedAt: true,
        }
    });
    if(!user) return notFound();
    return ok(user);
}

export const createClientService = async (client:IClient) => {
    const data = await prisma.client.create({
        data:{
            document:client.document,
            email: client.email,
            name: client.name,
            phone: client.phone,
            type: client.type,
            contactName: client.contactName,
            ie: client.ie,
            address: {
                create: {
                    city: client.address.city,
                    state: client.address.state,
                    street: client.address.street,
                    zip: client.address.zip,
                    number: client.address.number
                }
            }
        },
        include: {
            address: true
        },
        omit: {
            id: true
        }
    });
    return created(data);
}