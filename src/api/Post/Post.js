import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Post: {
    postAuthor: async (parent) => await prisma.post.findUnique({ where: { id: parent.id } }).postAuthor(),
    // files: async (parent) => await prisma.post.findUnique({ where: { id: parent.id } }).files(),

  },
};
