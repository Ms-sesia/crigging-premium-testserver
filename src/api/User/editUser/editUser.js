import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Mutation: {
    editUser: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      let { email, name, phoneNumber, avatar, bio } = args;
      const { user } = request;
      if (!email) email = user.email;
      if (!name) name = user.name;
      if (!phoneNumber) phoneNumber = user.phoneNumber;
      if (!avatar) avatar = user.avatar;
      if (!bio) bio = user.bio;
      return await prisma.user.update({
        where: { id: user.id },
        data: {
          email,
          name,
          phoneNumber,
          avatar,
          bio,
        },
      });
    },
  },
};
