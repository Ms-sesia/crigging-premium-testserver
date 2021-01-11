import { PrismaClient } from "@prisma/client";
import { sendMail } from "../../../utils";
import { sendBillingMail } from "../../../utils/sendEmail";

const prisma = new PrismaClient();

export default {
  Mutation: {
    sendOverWork: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { email, yearMonth, orderBy } = args;
      let early = [];
      let night = [];
      let allnight = [];
      let weekend = [];
      let overtime = [];

      try {
        const overworkSheets = await prisma.overWork.findMany({
          where: {
            AND: [{ overWorkAuthorId: user.id }, { yearMonth: yearMonth }],
          },
          orderBy: orderBy,
        });

        overworkSheets.map((sheet) => {
          const { overWorkCategory } = sheet;
          switch (overWorkCategory) {
            case "EARLY":
              early.push(sheet);
              break;
            case "ALLNIGHT":
              allnight.push(sheet);
              break;
            case "NIGHT":
              night.push(sheet);
              break;
            case "WEEKEND":
              weekend.push(sheet);
              break;
            case "OVERTIME":
              overtime.push(sheet);
              break;
            default:
          }
        });

        const workList = { early, night, allnight, weekend, overtime };
        // console.log(workList);
        await sendBillingMail({
          workData: workList,
          worker: user.name,
          // from: user.email,
          to: email,
        });
        return true;
      } catch (e) {
        throw new Error(e);
        return false;
      }
      // const from = user.email;
      // const { email: to, title, content } = args;
      // try {
      //   // const result = await sendMail(user.email, title, content).catch();
      //   const result = await sendMail(from, to, title, content).catch();
      //   console.log(result);
      //   return true;
      // } catch (e) {
      //   console.log("메일 전송에 실패하였습니다", e);
      //   return false;
      // }
    },
  },
};
