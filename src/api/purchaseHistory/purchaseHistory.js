import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  PurchaseHistory: {
    user: async (parent) => await prisma.purchaseHistory.findUnique({ where: { id: parent.id } }).user(),
    paidCranes: async (parent) => await prisma.purchaseHistory.findUnique({ where: { id: parent.id } }).paidCranes(),
  },
};
