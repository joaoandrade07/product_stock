import { ClientType } from "../../generated/prisma";
import { IAddress } from "../Address";

export interface IClient {
    type: ClientType;
    name: string;
    email: string;
    phone: string;
    document: string;
    ie: string;
    contactName: string;
    address: IAddress;
}