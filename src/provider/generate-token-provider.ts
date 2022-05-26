import { sign } from "jsonwebtoken";

export class GenerateTokenProvider {
  async execute(userId: string) {
    const token = sign({}, "T0p$ecr3tkEy", {
      subject: userId,
      expiresIn: "30m",
    });
    return token;
  }
}
