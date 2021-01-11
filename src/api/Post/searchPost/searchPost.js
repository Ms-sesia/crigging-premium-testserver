import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Query: {
    searchPost: async (_, args, { request, isAuthenticate }) => {
      try {
        const result = await prisma.post.findMany({
          where: {
            OR: [{ title: { contains: args.term } }, { content: { contains: args.term } }],
          },
        });
        return result;
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};
