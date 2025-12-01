import { IClient } from "../interfaces/Clients"
import prisma from "../prisma"
import { created, notFound, ok } from "../utils/http-helper"


export const getAllClientsService = async () => {
    const users = await prisma.client.findMany({
        omit: {
            createdAt: true,
            updatedAt: true,
        },
        include: { address: true }
    });
    return ok(users);
}

export const getClientByDocumentOrEmailOrIdService = async (document: string) => {
    const client = await prisma.client.findMany({
        where: {
            OR:[
                {
                    document:{
                        equals:document
                    }
                },
                {
                    email:{
                        equals:document
                    }
                },
                {
                    id:{
                        equals:document
                    }
                },
            ]
        },
        omit: {
            createdAt: true,
            updatedAt: true,
        },
        include: { 
            address: {
                select: {
                    id:true,
                    street:true,
                    number:true,
                    city:true,
                    state:true,
                    zip:true
                }
            } 
        }
    });
    if (!client) return notFound();
    return ok(client);
}

export const createClientService = async (client: IClient) => {
    const data = await prisma.client.create({
        data: {
            document: client.document,
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