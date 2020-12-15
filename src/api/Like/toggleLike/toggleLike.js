import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Mutation: {
    toggleLike: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const filterOption = {
        where: { AND: [{ userId: user.id }, { postId: args.postId }] },
      };

      try {
        const existLike = await prisma.like.findMany(filterOption);
        if (existLike.length > 0) await prisma.like.deleteMany(filterOption);
        else {
          await prisma.like.create({
            data: {
              user: { connect: { id: user.id } },
              post: { connect: { id: args.postId } },
            },
          });
        }
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },
};
