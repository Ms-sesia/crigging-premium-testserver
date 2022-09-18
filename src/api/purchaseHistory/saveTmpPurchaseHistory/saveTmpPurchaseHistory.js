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
        const D_PH = await prisma.tmpPurchaseHistory.findUnique({ where: { phoneNumber: user.phoneNumber } });
        if (D_PH) {
          const DPHCraneNames = await prisma.tmpCraneNames.findMany({ where: { tmpPurchaseHistoryId: D_PH.id } });
          if (DPHCraneNames) {
            for (let i = 0; i < DPHCraneNames.length; i++) {
              await prisma.tmpCraneNames.delete({ where: { id: DPHCraneNames[i].id } });
            }
            await prisma.tmpPurchaseHistory.delete({ where: { phoneNumber: user.phoneNumber } });
          }
        }

        const TPH = await prisma.tmpPurchaseHistory.create({
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
              TmpPurchaseHistory: { connect: { id: TPH.id } },
            },
          });
        }
        return true;
      } catch (e) {
        console.log("Error location: saveTmpPurchaseHistory.", e);
        throw new Error("결제내역 임시저장에 실패하였습니다.");
      }
    },
  },
};
