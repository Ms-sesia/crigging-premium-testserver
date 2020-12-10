import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Mutation: {
    createPost: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      return await prisma.post.create({
        data: {
          title: args.title,
          text: args.text,
          postCategory: args.postCategory,
          files: args.files,
          postAuthor: { connect: { id: user.id } },
        },
      });
    },
  },
};
