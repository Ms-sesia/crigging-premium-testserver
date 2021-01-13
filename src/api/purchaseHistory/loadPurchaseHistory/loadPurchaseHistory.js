import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Query: {
    loadPurchaseHistory: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      console.log(user.id);
      try {
        return await prisma.purchaseHistory.findMany({ where: { userId: user.id } });
      } catch (e) {
        console.log(e);
        throw new Error("ERROR: 구매내역을 찾지 못했습니다. 다시 시도해주세요.");
      }
    },
  },
};
