import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Mutation: {
    purchaseHistoryRecord: (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { date, cardCompany, price, installment, receipt } = args;
      
    },
  },
};
