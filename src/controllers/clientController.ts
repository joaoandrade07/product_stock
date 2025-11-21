import { Request, Response } from "express";
import { IClient } from "../interfaces/Clients";
import { createClientService, getAllClientsService, getClientByIdService } from "../services/clientService";

export const getAllClientsController = async(req:Request, res:Response) => {
    const data = await getAllClientsService();
    res.status(data.statusCode).json(data.body);
}

export const getClientById = async(req:Request, res:Response) => {
    const id: string = req.params.id;
    const data = await getClientByIdService(id);
    res.status(data.statusCode).json(data.body);
}

export const createClientController = async (req:Request, res:Response) => {
    const client: IClient = req.body;
    const data = await createClientService(client);
    res.status(data.statusCode).json(data.body);
}