import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Query: {
    seeFullPost: async (_, args, { request }) => {
      const { postCategory, orderBy, take, cursor } = args;
      try {
        // cursor가 없으면 처음부터 있으면 cursor 다음부터.
        const posts = cursor
          ? await prisma.post.findMany({
              take: take,
              skip: 1,
              cursor: { id: cursor },
              where: {
                postCategory: postCategory,
              },
              orderBy: orderBy,
            })
          : await prisma.post.findMany({
              take: take,
              where: {
                postCategory: postCategory,
              },
              orderBy: orderBy,
            });
        const preCursor = posts[posts.length - 1].id;

        return { posts, preCursor };
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};
