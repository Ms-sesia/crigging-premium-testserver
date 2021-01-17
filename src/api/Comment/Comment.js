import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Comment: {
    commentAuthor: async (parent) => await prisma.comment.findUnique({ where: { id: parent.id } }).commentAuthor(),
    post: async (parent) => await prisma.comment.findUnique({ where: { id: parent.id } }).post(),
  },
};
