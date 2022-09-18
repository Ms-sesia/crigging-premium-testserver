import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Like: {
    user: async (parent) => await prisma.like.findUnique({ where: { id: parent.id } }).user(),
    post: async (parent) => await prisma.like.findUnique({ where: { id: parent.id } }).post(),
  },
};
