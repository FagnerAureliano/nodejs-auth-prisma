import { prisma } from "../prisma/client";
import dayjs from "dayjs";

export class GenerateRefreshToken {
  async execute(userId: string) {
    const expiresIn = dayjs().add(30, "minute").unix();

    const generateRefreshToken = prisma.refreshToken.create({
      data: {
        userId,
        expiresIn,
      },
    });
    return generateRefreshToken;
  }
}
