import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Query: {
    seePostDetail: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const postId = args.postId;
      try {
        return await prisma.post.findUnique({
          where: { id: postId },
        });
      } catch (e) {
        console.log(e);
        throw new Error("ERROR: post를 찾지 못했습니다.");
      }
    },
  },
};
