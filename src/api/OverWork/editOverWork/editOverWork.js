import { PrismaClient } from "@prisma/client";
import dateKinds from "../../../libs/dateKinds";

const prisma = new PrismaClient();

export default {
  Mutation: {
    editOverWork: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { overWorkId, date, workingTime, location, content, amount, overWokrCategory } = args;
      const recorded = await prisma.overWork.findUnique({ where: { id: id } });

      if (!date) date = recorded.date;
      if (!workingTime) workingTime = recorded.workingTime;
      if (!location) location = recorded.location;
      if (!content) content = recorded.content;
      if (!amount) amount = recorded.amount;
      if (!overWorkCategory) overWorkCategory = recorded.overWorkCategory;
      
      const { week, yearMonth, yearMonthDay } = dateKinds(data);

      return await prisma.overWork.update({
        where: { id: overWorkId },
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
        },
      });
    },
  },
};
