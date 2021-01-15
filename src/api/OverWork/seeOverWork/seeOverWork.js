import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Query: {
    seeOverWork: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { yearMonth, overWorkCategory } = args;
      try {
        const overWork = overWorkCategory
          ? await prisma.overWork.findMany({
              where: {
                AND: [{ yearMonth: yearMonth }, { overWorkAuthorId: user.id }, { overWorkCategory: overWorkCategory }],
              },
            })
          : await prisma.overWork.findMany({
              where: { AND: [{ yearMonth: yearMonth }, { overWorkAuthorId: user.id }] },
            });
        return overWork;
      } catch (e) {
        console.log(e);
        throw new Error("ERROR: 기성기록을 불러오는데 실패하였습니다.");
      }
    },
  },
};
