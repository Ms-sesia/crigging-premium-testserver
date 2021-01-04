import { PrismaClient } from "@prisma/client";
import { sendMail } from "../../utils";

const prisma = new PrismaClient();

export default {
  Mutation: {
    sendSuggestion: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { title, content } = args;

      try {
        const result = await sendMail(user.email, title, content).catch();
        // console.log(result);
        return true;
      } catch (e) {
        console.log("메일 전송에 실패하였습니다", e);
        return false;
      }
    },
  },
};
