import { Router, Request, Response } from "express";
import { createUserController, deleteUserController, getAllUsersController, getUserByIdController } from "./controllers/userController";
import { createClientController, getAllClientsController, getClientById } from "./controllers/clientController";
import { loginController } from "./controllers/loginController";

export const router = Router();

router.get("/", (req: Request, res: Response) => {
    res.status(200).json({ "response": "ola mundo!" });
});

router.post("/login", loginController);


//Users routes
router.get("/getUsers", getAllUsersController);
router.get("/getUsers/:id", getUserByIdController);
router.post("/createUser", createUserController);
router.delete("/deleteUser/:id", deleteUserController);


//Clients routes
router.post("/createClient", createClientController);
router.get("/getClients", getAllClientsController);
router.get("/getClients/:id", getClientById);