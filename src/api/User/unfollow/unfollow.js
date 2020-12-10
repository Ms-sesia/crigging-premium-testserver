import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Mutation: {
    unfollow: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request; //me
      try {
        await prisma.user.update({
          where: { id: user.id },
          data: { following: { disconnect: { id: args.id } } },
        });
        return true;
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};
