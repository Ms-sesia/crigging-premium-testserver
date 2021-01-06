import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Mutation: {
    purchaseHistoryRecord: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { date, cardCompany, price, installment, receipt } = args;
      return await prisma.purchaseHistory.create({
        data: {
          date,
          cardCompany,
          price,
          installment,
          receipt,
          user: { connect: { id: user.id } },
        },
      });
    },
  },
};
