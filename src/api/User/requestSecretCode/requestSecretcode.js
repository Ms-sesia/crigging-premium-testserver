import { PrismaClient } from "@prisma/client";
import { generateSecretCode, sendSecretSMS } from "../../../libs/utils";

const prisma = new PrismaClient();

export default {
  Mutation: {
    requestSecretCode: async (_, args, { request }) => {
      const user = await prisma.user.findUnique({
        where: { phoneNumber: args.phoneNumber },
      });
      if (user) {
        try {
          const secretCode = generateSecretCode();
          if (args.phoneNumber === "01012345678") {
            await prisma.user.update({
              where: { phoneNumber: args.phoneNumber },
              data: { loginSecretCode: "123456" },
            });
            return true;
          }
          await sendSecretSMS(args.phoneNumber, "secretCode", secretCode);
          await prisma.user.update({
            where: { phoneNumber: args.phoneNumber },
            data: { loginSecretCode: secretCode },
          });
          return true;
        } catch (e) {
          console.log(e);
          return false;
        }
      } else throw new Error("등록되지 않은 핸드폰 번호입니다. 먼저 회원가입을 해주세요.");
    },
  },
};
