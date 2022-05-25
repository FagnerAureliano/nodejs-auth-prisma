import { Router } from "express";
import { CreateUserController } from "./create-user/create-user-controller";
import { AuthenticateUserController } from './authenticate-user/authenticate-user-controller';

export const router = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();

router.post("/users", createUserController.handle);
router.post("/login", authenticateUserController.handle);
 