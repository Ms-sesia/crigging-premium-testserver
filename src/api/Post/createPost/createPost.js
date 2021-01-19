import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Mutation: {
    createPost: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { files } = args;
      const post = await prisma.post.create({
        data: {
          content: args.content,
          postCategory: args.postCategory,
          postAuthor: { connect: { id: user.id } },
        },
      });
      if (files) {
        files.forEach(async (file) => {
          await prisma.file.create({
            data: {
              url: file,
              post: { connect: { id: post.id } },
            },
          });
        });
      }
      const result = await prisma.post.findUnique({
        where: { id: post.id },
      });
      return result;
    },
  },
};
