import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Mutation: {
    editComment: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { commentId, actions, content } = args;
      if (actions === "DELETE") {
        await prisma.comment.deleteMany({ where: { id: commentId } });
        return true;
      } else if (actions === "EDIT") {
        if (!content) throw new Error("내용을 입력해주세요");
        await prisma.comment.update({
          where: { id: commentId },
          data: { content: args.content },
        });
        return true;
      }
    },
  },
};
