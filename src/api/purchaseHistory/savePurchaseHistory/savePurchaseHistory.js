import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Mutation: {
    savePurchaseHistory: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { date, craneNames, cardCompany, price, installment, receipt } = args;
      for (let i = 0; i < craneNames.length; i++) {
        await prisma.purchaseHistory.create({
          data: {
            date,
            craneName: craneNames[i],
            cardCompany,
            price,
            installment,
            receipt,
            user: { connect: { id: user.id } },
          },
        });
      }
      return true;
    },
  },
};
