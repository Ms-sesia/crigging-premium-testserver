import { PrismaClient } from ".prisma/client";

const prisma = new PrismaClient();

export default {
  Mutation: {
    purchaseCancel: async (_, args, __) => {
      const { phoneNumber } = args;
      try {
        const TPH = await prisma.tmpPurchaseHistory.findUnique({
          where: { phoneNumber },
        });
        const TPHcraneNames = await prisma.tmpCraneNames.findMany({
          where: { tmpPurchaseHistoryId: TPH.id },
        });
        for (let i = 0; i < TPHcraneNames.length; i++) {
          await prisma.tmpCraneNames.delete({
            where: { id: TPHcraneNames[i].id },
          });
        }
        await prisma.tmpPurchaseHistory.delete({
          where: { phoneNumber },
        });
        return true;
      } catch (e) {
        console.log("Error location: purchaseCancel.", e);
        throw new Error("결제취소에 실패하였습니다.");
      }
    },
  },
};
