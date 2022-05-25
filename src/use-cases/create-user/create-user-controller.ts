import { Request, Response } from "express";
import { CreateUserUseCase } from "./create-user-use-case";

export class CreateUserController {
  async handle(req: Request, res: Response) {
    const { name, username, password } = req.body;

    const createUserUseCase = new CreateUserUseCase();

    const user = await createUserUseCase.execute({
      name,
      username,
      password,
    });

    return res.json(user);
  }
}
