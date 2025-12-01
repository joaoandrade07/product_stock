import { Router, Request, Response } from "express";
import { createUserController, deleteUserController, getAllUsersController, getUserByIdController } from "./controllers/userController";
import { createClientController, getAllClientsController, getClientByDocumentOrEmailOrIdController } from "./controllers/clientController";
import { loginController } from "./controllers/loginController";
import { authenticateToken } from "./middlewares/auth/authenticateToken";
import { authorizeRole } from "./middlewares/auth/authorizeRole";
import { Role } from "./generated/prisma";
import { authorizeRoleOrSelf } from "./middlewares/auth/authorizeRoleOrSelf";
import { registerAdmin } from "./middlewares/register/registerAdmin";
import { createProductController, getAllProductsController } from "./controllers/productController";
import { createBudgetController, deleteBudgetController, getAllBudgetsController, getBudgetByIdController } from "./controllers/budgetController";

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
router.get("/getClients/:document", authenticateToken, getClientByDocumentOrEmailOrIdController);

//Products routes
router.post("/createProduct", authenticateToken, createProductController);
router.get("/getProduct", authenticateToken, getAllProductsController);


//Budgets routes
router.get("/getBudget/:id", authenticateToken, getBudgetByIdController)
router.get("/getBudget", authenticateToken, getAllBudgetsController);
router.post("/createBudget", authenticateToken, createBudgetController);
router.delete("/deleteBudget/:id", authenticateToken, deleteBudgetController);