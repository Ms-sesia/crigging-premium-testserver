import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Query: {
    seeFullPost: async (_, args, { request }) => {
      const { postCategory, userId } = args;
      return await prisma.post.findMany({
        where: {
          AND: [{ postCategory: postCategory }, { postAuthorId: userId }],
        },
      });
    },
  },
};
