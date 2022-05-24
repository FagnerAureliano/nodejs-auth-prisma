import { hash } from "bcryptjs";
import { client } from "../../prisma/client";

interface IUserRequest {
  name: string;
  username: string;
  password: string;
}

export class AuthenticateUserCase {
  async execute({ name, username, password }: IUserRequest) {
    //Verificar se o user existe
    const userAlreadyExistis = await client.user.findFirst({
      where: { username },
    });

    if (userAlreadyExistis) {
      throw new Error("User already ex ists!");
    }

    //Criptografa senha
    const passwordHash = await hash(password, 8);
    //Cadastrar o user
    const user = await client.user.create({
      data: {
        name,
        username,
        password: passwordHash,
      },
    });

    return user;
  }
}
