import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Mutation: {
    purchaseHistoryRecord: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { date, craneName, cardCompany, price, installment, receipt } = args;
      return await prisma.purchaseHistory.create({
        data: {
          date,
          craneName,
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
