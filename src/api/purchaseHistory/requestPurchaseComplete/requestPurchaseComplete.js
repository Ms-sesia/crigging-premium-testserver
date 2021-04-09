import { PrismaClient } from ".prisma/client";

const prisma = new PrismaClient();
// App: 결제완료 여부 요청. 완료시 결제 모달창 닫고 임시 결제내역 삭제 resolver실행.
export default {
  Query: {
    requestPurchaseComplete: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      try {
        const TPH = await prisma.tmpPurchaseHistory.findUnique({
          where: { phoneNumber: user.phoneNumber },
        });
        if (TPH.paid) return true;
        return false;
      } catch (e) {
        console.log("Error location: requestPurchaseComplete.", e);
        throw new Error("결제완료 확인 요청에 실패하였습니다.");
      }
    },
  },
};
