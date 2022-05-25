import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { client } from "../../prisma/client";
import { GenerateRefreshToken } from '../../provider/generate-refresh-token';

interface IRequest {
  username: string;
  password: string;
}

export class AuthenticateUserUseCase {
  async execute({ username, password }: IRequest) {
    const userAlreadyExistis = await client.user.findFirst({
      where: {
        username,
      },
    });
    if (!userAlreadyExistis) {
      throw new Error("User or password incorrect!");
    }
    const passwordMatch = await compare(password, userAlreadyExistis.password);

    if (!passwordMatch) {
      throw new Error("User or password incorrect!");
    }

    const token = sign({}, "T0p$ecr3tkEy", {
      subject: userAlreadyExistis.id,
      expiresIn: "20s",
    });

    const generateRefreshToken = new GenerateRefreshToken()
    const refreshToken = await generateRefreshToken.execute(userAlreadyExistis.id)

    return {token, refreshToken};
  }
}
