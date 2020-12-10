import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Query: {
    me: async (_, args, { request }) => {
      return await prisma.user.findUnique({
        where: { phoneNumber: args.phoneNumber },
      });
    },
  },
};
