import { response, Router } from "express";
import { CreateUserController } from "./create-user/create-user-controller";
import { AuthenticateUserController } from "./authenticate-user/authenticate-user-controller";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

export const router = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();

router.post("/users", createUserController.handle);
router.post("/login", authenticateUserController.handle);

router.get("/courses", ensureAuthenticated,(req, res) => {
 return res.json([
    { id: 1, name: "ReactJS" },
    { id: 2, name: "React Native" },
    { id: 3, name: "Angular" },
    { id: 4, name: "NodeJS" },
    { id: 5, name: "Elixir" },
  ]);
});
