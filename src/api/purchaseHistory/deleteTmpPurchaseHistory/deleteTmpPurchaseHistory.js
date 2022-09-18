import { PrismaClient } from ".prisma/client";

const prisma = new PrismaClient();
// App: 결제완료시 결제 모달창 닫고 임시 결제내역 삭제.
export default {
  Mutation: {
    deleteTmpPurchaseHistory: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      try {
        const TPH = await prisma.tmpPurchaseHistory.findUnique({
          where: { phoneNumber: user.phoneNumber },
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
          where: { phoneNumber: user.phoneNumber },
        });
        return true;
      } catch (e) {
        console.log("Error location: deleteTmpPurchaseHistory.", e);
        throw new Error("임시 결제내역 삭제에 실패하였습니다.");
      }
    },
  },
};
