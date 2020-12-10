import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  User: {
    following: (parent) => prisma.user.findUnique({ where: { id: parent.id } }).following(),
    followingCount: async (parent) => {
      const followersCount = await prisma.user.findMany({
        where: { followers: { some: { id: parent.id } } },
        select: { id: true },
      });
      return followersCount.length;
    },
    followers: (parent) => prisma.user.findUnique({ where: { id: parent.id } }).followers(),
    followersCount: async (parent) => {
      const followingCount = await prisma.user.findMany({
        where: { following: { some: { id: parent.id } } },
        select: { id: true },
      });
      return followingCount.length;
    },
  },
};
