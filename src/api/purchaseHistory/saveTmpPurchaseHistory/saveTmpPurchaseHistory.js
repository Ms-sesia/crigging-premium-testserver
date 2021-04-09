import { PrismaClient } from ".prisma/client";
import { generateSecretCode } from "../../../libs/utils";

const prisma = new PrismaClient();
// App: 결제인증을 위해 결제 내역 임시 저장
export default {
  Mutation: {
    saveTmpPurchaseHistory: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { price, craneNames } = args;
      const authCode = generateSecretCode();
      try {
        const tmpPurchaseHistory = await prisma.tmpPurchaseHistory.create({
          data: {
            price,
            authCode,
            phoneNumber: user.phoneNumber,
          },
        });
        for (let i = 0; i < craneNames.length; i++) {
          await prisma.tmpCraneNames.create({
            data: {
              craneName: craneNames[i],
              TmpPurchaseHistory: { connect: { id: tmpPurchaseHistory.id } },
            },
          });
        }
        return true;
      } catch (e) {
        console.log("Error location: tmpSavePurchaseHistory.", e);
        throw new Error("결제내역 임시저장에 실패하였습니다.");
      }
    },
  },
};
