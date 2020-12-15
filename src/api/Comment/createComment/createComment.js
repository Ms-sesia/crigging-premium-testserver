import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Mutation: {
    createComment: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { postId } = args;
      try {
        return await prisma.comment.create({
          data: {
            text: args.text,
            commentAuthor: { connect: { id: user.id } },
            post: { connect: { id: postId } },
          },
        });
      } catch (e) {
        console.log(e);
      }
    },
  },
};
