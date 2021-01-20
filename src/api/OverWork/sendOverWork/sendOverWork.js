import { PrismaClient } from "@prisma/client";
import sendBillingMail from "../../../../libs/utils/sendEmail/sendBillingMail";

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
        await sendBillingMail({
          yearMonth: yearMonth,
          workData: workList,
          worker: user.name,
          to: email,
        });
        return true;
      } catch (e) {
        console.log("mail send error.", e);
        throw new Error(e);
      }
    },
  },
};
