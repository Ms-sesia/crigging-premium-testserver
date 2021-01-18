import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Post: {
    postAuthor: async (parent) => await prisma.post.findUnique({ where: { id: parent.id } }).postAuthor(),
    files: async (parent) => await prisma.post.findUnique({ where: { id: parent.id } }).files(),
    comments: async (parent) => await prisma.post.findUnique({ where: { id: parent.id } }).comments(),
    likes: async (parent) => await prisma.post.findUnique({ where: { id: parent.id } }).likes(),
    isLiked: async (parent, __, { request }) => {
      const { user } = request;
      const likeResult = await prisma.like.findMany({
        where: {
          AND: [{ postId: parent.id }, { userId: user.id }],
        },
      });
      return likeResult.length > 0 ? true : false;
    },
    commentCount: async (parent) => {
      try {
        const commentCount = await prisma.post.findMany({
          where: { comments: { some: { postId: parent.id } } },
          select: { id: true },
        });
        return commentCount.length;
      } catch (e) {
        console.log(e);
      }
    },
    likeCount: async (parent) => {
      try {
        const likeCount = await prisma.post.findMany({
          where: { likes: { some: { postId: parent.id } } },
          select: { id: true },
        });
        return likeCount.length;
      } catch (e) {
        console.log(e);
      }
    },
  },
};
