import { PrismaClient } from "@prisma/client";
import dateKinds from "../../../../libs/dateKinds";

const prisma = new PrismaClient();

export default {
  Mutation: {
    createOverWork: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { date, workingTime, location, content, amount, overWorkCategory } = args;
      const { week, yearMonth, yearMonthDay } = dateKinds(date);

      if (!date) throw new Error("날짜를 선택하세요.");
      if (!workingTime) throw new Error("작업시간을 입력하세요.");
      if (!location) throw new Error("작업 위치를 입력하세요.");
      if (!content) throw new Error("작업 내용을 입력하세요.");
      if (!amount) throw new Error("기록할 금액을 입력하세요.");
      if (!overWorkCategory) throw new Error("기록할 기성의 카테고리를 선택하세요.");

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
    },
  },
};
