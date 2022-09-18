import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  TmpPurchaseHistory: {
    craneNames: async (parent) => await prisma.tmpPurchaseHistory.findUnique({ where: { id: parent.id } }).craneNames(),
  },
};
