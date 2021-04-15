import { PrismaClient } from ".prisma/client";

const prisma = new PrismaClient();
// Web: 결제인증번호 확인 후 결제내용 전달.
export default {
  Mutation: {
    confirmPurchaseAuthCode: async (_, args, __) => {
      const { phoneNumber, authCode } = args;
      try {
        const tmpPCH = await prisma.tmpPurchaseHistory.findUnique({
          where: { phoneNumber },
        });
        if (tmpPCH.authCode === authCode) return tmpPCH;
        else throw 1;
      } catch (e) {
        console.log("Error location: confirmPurchaseAuthCode.", e);
        if (e === 1) throw new Error("결제를 위한 인증번호가 일치하지 않습니다. 다시 확인하고 입력해주세요.");
        throw new Error("결제정보를 불러오는데 실패하였습니다.");
      }
    },
  },
};
