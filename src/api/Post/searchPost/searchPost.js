import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Query: {
    searchPost: async (_, args, { request, isAuthenticate }) => {
      // const startWithSearchPost = await prisma.post.findMany({
      //   where: {
      //     OR: [{ title: { startsWith: args.term } }, { text: { startsWith: args.term } }],
      //   },
      // });
      const result = await prisma.post.findMany({
        where: {
          OR: [{ title: { contains: args.term } }, { text: { contains: args.term } }],
        },
      });
      return result;
      // return [...startWithSearchPost, ...containSearchPost];
    },
  },
};
