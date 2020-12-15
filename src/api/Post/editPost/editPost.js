import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Mutation: {
    editPost: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      let { id, text, title, postCategory, files, actions } = args;
      const post = await prisma.post.findUnique({ where: { id: id } });
      if (!text) text = post.text;
      if (!title) title = post.title;
      if (!postCategory) postCategory = post.postCategory;
      if (!files) files = post.files;
      
      if (post) {
        if (actions === "EDIT")
          return await prisma.post.update({
            where: { id: id },
            data: {
              text,
              title,
              postCategory,
              files,
            },
          });
        else if (actions === "DELETE") return await prisma.post.delete({ where: { id: id } });
      } else throw new Error("해당 동작을 할 수 없습니다.");
    },
  },
};
