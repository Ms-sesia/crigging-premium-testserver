import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  User: {
    following: (parent) => prisma.user.findUnique({ where: { id: parent.id } }).following(),
    followingCount: async (parent) => {
      try {
        const followersCount = await prisma.user.findMany({
          where: { followers: { some: { id: parent.id } } },
          select: { id: true },
        });
        return followersCount.length;
      } catch (e) {
        console.log(e);
      }
    },
    followers: (parent) => prisma.user.findUnique({ where: { id: parent.id } }).followers(),
    followersCount: async (parent) => {
      try {
        const followingCount = await prisma.user.findMany({
          where: { following: { some: { id: parent.id } } },
          select: { id: true },
        });
        return followingCount.length;
      } catch (e) {
        console.log(e);
      }
    },
    likes: async (parent) => await prisma.user.findUnique({ where: { id: parent.id } }).likes(),
    posts: async (parent) => await prisma.user.findUnique({ where: { id: parent.id } }).posts(),
    // riggingRecords: async (parent) => await prisma.user.findUnique({ where: { id: parent.id } }).craneDataRecord(),
    purchaseHistory: async (parent) => await prisma.user.findUnique({ where: { id: parent.id } }).purchaseHistory(),
    postCount: async (parent) => {
      try {
        const postsCount = await prisma.post.findMany({
          where: { postAuthorId: parent.id },
          select: { id: true },
        });
        return postsCount.length;
      } catch (e) {
        console.log(e);
      }
    },
  },
};
