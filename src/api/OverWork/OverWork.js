import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  OverWork: {
    overWorkAuthor: async (parent) => await prisma.overWork.findUnique({ where: { id: parent.id } }).overWorkAuthor(),
  },
};
