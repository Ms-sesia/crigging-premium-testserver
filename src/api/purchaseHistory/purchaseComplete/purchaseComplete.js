import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
// Web: 결제 완료시 결제내역을 저장할 purchaseHistory 생성.
export default {
  Mutation: {
    purchaseComplete: async (_, args, __) => {
      const { phoneNumber, craneNames, price, date, cardCompany, installment, receipt } = args;
      try {
        const PH = await prisma.purchaseHistory.create({
          data: {
            date,
            cardCompany,
            price,
            installment,
            receipt,
            user: { connect: { phoneNumber } },
          },
        });
        for (let i = 0; i < craneNames.length; i++) {
          await prisma.paidCraneNames.create({
            data: {
              craneName: craneNames[i],
              purchaseHistory: { connect: { id: PH.id } },
            },
          });
        }
        await prisma.tmpPurchaseHistory.update({
          where: { phoneNumber },
          data: {
            paid: true,
          },
        });
        return true;
      } catch (e) {
        console.log("Error location: purchaseComplete.", e);
        throw new Error("결제내역 저장에 실패하였습니다.");
      }
    },
  },
};
