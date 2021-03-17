import { PrismaClient } from "@prisma/client";
import dateKinds from "../../../libs/dateKinds";

const prisma = new PrismaClient();

export default {
  Mutation: {
    createOverWork: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { date, workingTime, location, content, amount, overWorkCategory } = args;

      try {
        const { week, yearMonth, yearMonthDay } = dateKinds(date);
        return await prisma.overWork.create({
          data: {
            date,
            yearMonth,
            yearMonthDay,
            week,
            workingTime,
            location,
            content,
            overWorkCategory,
            amount,
            overWorkAuthor: { connect: { id: user.id } },
          },
        });
      } catch (e) {
        console.log(e);
        throw new Error("기성 정보를 생성하지 못하였습니다.");
      }
    },
  },
};
