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
        if (user.length) throw 1;

        await prisma.user.create({
          data: {
            name,
            email,
            phoneNumber,
          },
        });
        return true;
      } catch (e) {
        console.log("Error location: createUser", e);
        if (e === 1) throw new Error("이미 사용중인 핸드폰번호 입니다.");
        throw new Error("ERROR: 유저를 생성하지 못하였습니다.");
      }
    },
  },
};
