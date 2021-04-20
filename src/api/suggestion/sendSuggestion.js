import { sendMail } from "../../libs/utils";

export default {
  Mutation: {
    sendSuggestion: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { title, content } = args;
      try {
        await sendMail({ to: user.email, subject: title, html: content }, user.name, true).catch();
        return true;
      } catch (e) {
        console.log("메일 전송에 실패하였습니다", e);
        return false;
      }
    },
  },
};
