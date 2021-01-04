import { PrismaClient } from "@prisma/client";
import dateKinds from "../../../../libs/dateKinds";

const prisma = new PrismaClient();

export default {
  Mutation: {
    editOverWork: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { overWorkId, date, workingTime, location, content, amount, overWorkCategory, actions } = args;

      if (actions === "DELETE") return await prisma.overWork.delete({ where: { id: overWorkId } });
      else if (actions === "EDIT") {
        let week, yearMonth, yearMonthDay;
        if (date) ({ week, yearMonth, yearMonthDay } = dateKinds(date));
        try {
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
        } catch (e) {
          throw new Error("수정할 데이터가 없습니다.");
        }
      }
    },
  },
};
