import { Router, Request, Response } from "express";
import { createUserController, deleteUserController, getAllUsersController, getUserByIdController } from "./controllers/userController";
import { createClientController, getAllClientsController, getClientById } from "./controllers/clientController";
import { loginController } from "./controllers/loginController";
import { authenticateToken } from "./middlewares/auth/authenticateToken";
import { authorizeRole } from "./middlewares/auth/authorizeRole";
import { Role } from "./generated/prisma";
import { authorizeRoleOrSelf } from "./middlewares/auth/authorizeRoleOrSelf";
import { registerAdmin } from "./middlewares/register/registerAdmin";

export const router = Router();

router.get("/", (req: Request, res: Response) => {
    res.status(200).json({ "response": "ola mundo!" });
});

router.post("/login", loginController);


//Users routes
router.get("/getUsers", authenticateToken, authorizeRole([Role.ADMIN]), getAllUsersController);
router.get("/getUsers/:id", authenticateToken, authorizeRoleOrSelf([Role.ADMIN]), getUserByIdController);
router.post("/createUser", authenticateToken, registerAdmin, createUserController);
router.delete("/deleteUser/:id", authenticateToken, authorizeRoleOrSelf([Role.ADMIN]), deleteUserController);


//Clients routes
router.post("/createClient", authenticateToken, createClientController);
router.get("/getClients", authenticateToken, getAllClientsController);
router.get("/getClients/:id", authenticateToken, getClientById);

//Products routes


//Budgets routes