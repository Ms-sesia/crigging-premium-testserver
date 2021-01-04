import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Query: {
    seeOverWork: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { overWorkCategory, take, cursor, orderBy } = args;
      const overWork = cursor
        ? await prisma.overWork.findMany({
            take: take,
            skip: 1,
            cursor: { id: cursor },
            where: {
              AND: [{ overWorkCategory: overWorkCategory }, { overWorkAuthorId: user.id }],
            },
          })
        : await prisma.overWork.findMany({
            take: take,
            where: {
              AND: [{ overWorkCategory: overWorkCategory }, { overWorkAuthorId: user.id }],
            },
            // orderBy: orderBy,
          });
      console.log(overWork);
      const preCursor = overWork[overWork.length - 1].id;
      console.log(preCursor);
      return { overWork, preCursor };
    },
  },
};
