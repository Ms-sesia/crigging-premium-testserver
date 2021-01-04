import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Query: {
    seeFullPost: async (_, args, { request }) => {
      const { postCategory, userId, orderBy, take, cursor } = args;
      const posts = cursor
        ? await prisma.post.findMany({
            take: take,
            skip: 1,
            cursor: { id: cursor },
            where: {
              AND: [{ postCategory: postCategory }, { postAuthorId: userId }],
            },
            orderBy: orderBy,
          })
        : await prisma.post.findMany({
            take: take,
            where: {
              AND: [{ postCategory: postCategory }, { postAuthorId: userId }],
            },
            orderBy: orderBy,
          });
      const preCursor = posts[posts.length - 1].id;

      return { posts, preCursor };
    },
  },
};
