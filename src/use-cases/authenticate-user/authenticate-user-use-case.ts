import { compare } from "bcryptjs";
import { prisma } from "../../prisma/client";
import { GenerateRefreshToken } from "../../provider/generate-refresh-token";
import { GenerateTokenProvider } from "../../provider/generate-token-provider";

interface IRequest {
  username: string;
  password: string;
}

export class AuthenticateUserUseCase {
  async execute({ username, password }: IRequest) {
    const userAlreadyExists = await prisma.user.findFirst({
      where: {
        username,
      },
    });
    if (!userAlreadyExists) {
      throw new Error("User or password incorrect!");
    }
    const passwordMatch = await compare(password, userAlreadyExists.password);

    if (!passwordMatch) {
      throw new Error("User or password incorrect!");
    }

    const generateTokenProvider = new GenerateTokenProvider();
    const token = await generateTokenProvider.execute(userAlreadyExists.id);

    await prisma.refreshToken.deleteMany({
      where: {
        userId: userAlreadyExists.id,
      },
    });

    const generateRefreshToken = new GenerateRefreshToken();
    const refreshToken = await generateRefreshToken.execute(
      userAlreadyExists.id
    );

    return { token, refreshToken };
  }
}
