import { Router, Request, Response } from "express";
import { createUserController, getAllUsersController, getUserByIdController } from "./controllers/userController";
import { createClientController } from "./controllers/clientController";

export const router = Router();

router.get("/",(req: Request, res: Response)=>{
    res.status(200).json({"response": "ola mundo!"});
});

router.get("/getUsers", getAllUsersController);
router.get("/getUsers/:id", getUserByIdController);
router.post("/createUser", createUserController);


router.post("/createClient", createClientController);