import { BudgetStatus } from "../../generated/prisma"
import { IbudgetItem } from "../BudgetItem/intex";

export interface IBudget {
    clientId: string;
    status?: BudgetStatus;
    items: IbudgetItem[];
}