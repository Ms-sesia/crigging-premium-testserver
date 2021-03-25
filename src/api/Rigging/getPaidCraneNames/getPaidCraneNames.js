import { PrismaClient } from "@prisma/client";
import { allCraneList } from "../../../../build/libs/craneRigging/allCraneList";

const prisma = new PrismaClient();

export default {
  Query: {
    getPaidCraneNames: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      try {
        const purchaseHistory = await prisma.purchaseHistory.findMany({ where: { userId: user.id } });
        const paidCraneList = purchaseHistory.map((history) => {
          return history.craneName;
        });
        const paidCraneListCount = paidCraneList.length;
        const allCraneListCount = allCraneList.length;
        let notPaidCraneList = allCraneList;
        paidCraneList.forEach((crane) => {
          const index = notPaidCraneList.indexOf(crane);
          if (index) notPaidCraneList.splice(index, 1);
        });
        return { paidCraneList, paidCraneListCount, notPaidCraneList, allCraneListCount };
        // console.log("paidCraneList: ", paidCraneList);
        // console.log("paidCraneListCount: ", paidCraneListCount);
        // console.log("allCraneListCount: ", allCraneListCount);
        // console.log("notPaidCraneList: ", notPaidCraneList);
      } catch (e) {
        console.log("Error location: getPaidCraneNames.", e)
        throw new Error("ERROR: purchaseHistory를 받아오는데에 실패하였습니다.");
      }
    },
  },
};
