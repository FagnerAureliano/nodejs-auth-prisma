import { hash } from "bcryptjs";
import { prisma } from "../../prisma/client";

interface IUserCreate {
  name: string;
  username: string;
  password: string;
}

export class CreateUserUseCase {
  async execute({ name, username, password }: IUserCreate) {
    //Verificar se o user existe
    const userAlreadyExistis = await prisma.user.findFirst({
      where: { username },
    });

    if (userAlreadyExistis) {
      throw new Error("User already exists!");
    }

    //Criptografa senha
    const passwordHash = await hash(password, 8);
    //Cadastrar o user
    const user = await prisma.user.create({
      data: {
        name,
        username,
        password: passwordHash,
      },
    });

    return user;
  }
}
