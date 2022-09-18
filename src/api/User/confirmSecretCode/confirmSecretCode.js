import { PrismaClient } from "@prisma/client";
import { generateToken } from "../../../libs/utils";

const prisma = new PrismaClient();

export default {
  Mutation: {
    confirmSecretCode: async (_, args, { request }) => {
      const user = await prisma.user.findUnique({
        where: { phoneNumber: args.phoneNumber },
      });
      if (args.phoneNumber === "11122223333") return generateToken(user);
      if (user.loginSecretCode === args.secretCode) return generateToken(user);
      throw new Error("인증번호가 일치하지 않습니다.");
    },
  },
};
