import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Post: {
    postAuthor: async (parent) => await prisma.post.findUnique({ where: { id: parent.id } }).postAuthor(),
    files: async (parent) => {
      try {
        const result = await prisma.post.findUnique({ where: { id: parent.id } }).files();
        return result;
      } catch (e) {
        console.log(e);
        throw new Error("파일정보를 불러오는데 실패하였습니다.");
      }
    },
    comments: async (parent) => {
      try {
        const result = await prisma.post.findUnique({ where: { id: parent.id } }).comments();
        return result;
      } catch (e) {
        console.log(e);
        throw new Error("댓글정보를 불러오는데 실패하였습니다.");
      }
    },
    likes: async (parent) => {
      try {
        const result = await prisma.post.findUnique({ where: { id: parent.id } }).likes();
        return result;
      } catch (e) {
        console.log(e);
        throw new Error("좋아요 정보를 불러오는데 실패하였습니다.");
      }
    },
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
        const commentCount = await prisma.comment.findMany({
          where: { postId: parent.id },
        });
        return commentCount.length;
      } catch (e) {
        console.log(e);
      }
    },
    likeCount: async (parent) => {
      try {
        const likeCount = await prisma.like.findMany({
          where: { postId: parent.id },
        });
        return likeCount.length;
      } catch (e) {
        console.log(e);
      }
    },
  },
};
