import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Mutation: {
    createUser: async (_, args, { request }) => {
      const { email, name, phoneNumber } = args;
      try {
        const user = await prisma.user.findMany({
          where: {
            OR: [{ email: { contains: email } }, { phoneNumber: { contains: phoneNumber } }],
          },
        });
        if (user.length !== 0) throw new Error("이미 사용중인 이메일/핸드폰번호 입니다.");

        return await prisma.user.create({
          data: {
            name,
            email,
            phoneNumber,
          },
        });
      } catch (e) {
        console.log(e);
      }
    },
  },
};
