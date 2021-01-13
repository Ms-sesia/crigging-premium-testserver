import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Query: {
    getPaidCraneNames: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      try {
        const purchaseHistory = await prisma.purchaseHistory.findMany({ where: { userId: user.id } });
        return purchaseHistory.map((history) => {
          return history.craneName;
        });
      } catch (e) {
        throw new Error("ERROR: purchaseHistory를 받아오는데에 실패하였습니다.");
      }
    },
  },
};
