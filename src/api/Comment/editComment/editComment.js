import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Mutation: {
    editComment: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { commentId, actions, text } = args;
      if (actions === "DELETE") {
        await prisma.comment.deleteMany({ where: { id: commentId } });
        return true;
      } else if (actions === "EDIT") {
        if (!text) throw new Error("내용을 입력해주세요");
        await prisma.comment.update({
          where: { id: commentId },
          data: { text: args.text },
        });
        return true;
      }
    },
  },
};
