import { PrismaClient } from "@prisma/client";
import { generateToken } from "../../../utils";

const prisma = new PrismaClient();

export default {
  Mutation: {
    confirmSecretCode: async (_, args, { request }) => {
      const user = await prisma.user.findUnique({
        where: { phoneNumber: args.phoneNumber },
      });
      if (user.loginSecretCode === args.secretCode) return await generateToken(user);
      throw new Error("인증번호가 일치하지 않습니다.");
    },
  },
};
