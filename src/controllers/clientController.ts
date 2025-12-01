import { Request, Response } from "express";
import { IClient } from "../interfaces/Clients";
import { createClientService, getAllClientsService, getClientByDocumentOrEmailOrIdService } from "../services/clientService";

export const getAllClientsController = async(req:Request, res:Response) => {
    const data = await getAllClientsService();
    res.status(data.statusCode).json(data.body);
}

export const getClientByDocumentOrEmailOrIdController = async(req:Request, res:Response) => {
    const document: string = req.params.document;
    const data = await getClientByDocumentOrEmailOrIdService(document);
    res.status(data.statusCode).json(data.body);
}

export const createClientController = async (req:Request, res:Response) => {
    const client: IClient = req.body;
    const data = await createClientService(client);
    res.status(data.statusCode).json(data.body);
}