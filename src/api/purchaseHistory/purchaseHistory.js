import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  PurchaseHistory: {
    user: async (parent) => prisma.purchaseHistory.findUnique({ where: { id: parent.id } }).user(),
  },
};
