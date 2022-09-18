import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Query: {
    me: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user: _user } = request;
      const user = await prisma.user.findUnique({
        where: { id: _user.id },
      });
      const posts = await prisma.post.findMany({
        where: { postAuthorId: user.id },
        orderBy: { createdAt: "desc" },
      });
      return { user, posts };
    },
  },
};
