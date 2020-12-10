import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Mutation: {
    editPost: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      let { text, title, postCategory, files } = args;
      if (!text) text = args.text;
      if (!title) title = args.title;
      if (!postCategory) postCategory = args.postCategory;
      if (!files) files = args.files;
      return await prisma.post.update({
        where: { id: args.id },
        data: {
          text,
          title,
          postCategory,
          files,
        },
      });
    },
  },
};
