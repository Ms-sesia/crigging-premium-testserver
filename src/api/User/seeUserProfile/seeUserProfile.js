import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Query: {
    seeUserProfile: async (_, args, { request }) => {
      try {
        return await prisma.user.findUnique({ where: { id: Number(args.id) } });
      } catch (e) {
        console.log(e);
        throw new Error("잘못된 정보입니다. 다시 입력해주세요.");
      }
    },
  },
};
