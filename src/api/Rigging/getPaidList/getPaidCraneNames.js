import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Query: {
    getPaidCraneNames: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const purchaseHistory = await prisma.purchaseHistory.findMany({
        where: { userId: user.id },
      });
      const paidList = purchaseHistory.map((history) => {
        return history.craneName;
      })
      console.log(paidList);
    },
  },
};
