import { PrismaClient } from "@prisma/client";
import { use } from "passport";

const prisma = new PrismaClient();

export default {
  Mutation: {
    follow: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request; //me
      try {
        await prisma.user.update({
          where: { id: user.id },
          data: { following: { connect: { id: args.id } } },
        });
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },
};
