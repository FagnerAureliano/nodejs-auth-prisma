import dayjs from "dayjs";
import { client } from "../../prisma/client";
import { GenerateRefreshToken } from "../../provider/generate-refresh-token";
import { GenerateTokenProvider } from "../../provider/generate-token-provider";

export class RefreshTokenUserUseCase {
  async execute(refresh_token: string) {
    const refreshToken = await client.refreshToken.findFirst({
      where: {
        id: refresh_token,
      },
    });
    if (!refreshToken) {
      throw new Error("Refresh token invalid!");
    }

    const refreshTokenExpired = dayjs().isAfter(
      dayjs.unix(refreshToken.expiresIn)
    );

    const generateTokenProvider = new GenerateTokenProvider();
    const token = await generateTokenProvider.execute(refreshToken.userId);

    if (refreshTokenExpired) {
      await client.refreshToken.deleteMany({
        where: {
          userId: refreshToken.userId,
        },
      });
      const generateRefreshToken = new GenerateRefreshToken();
      const newRefreshToken = await generateRefreshToken.execute(
        refreshToken.userId
      );
      return { token, refresh_token: newRefreshToken };
    }

    return { token };
  }
}
