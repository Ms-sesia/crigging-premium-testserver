import { PrismaClient } from "@prisma/client";
import { allCraneList } from "../../../libs/craneRigging/allCraneList";
// import allCraneList from "../../../libs/craneRigging/allCraneList"

const prisma = new PrismaClient();

export default {
  Query: {
    getPaidCraneNames: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      try {
        let paidCraneList = new Array();
        const purchaseHistory = await prisma.purchaseHistory.findMany({ where: { userId: user.id } });
        for (let i = 0; i < purchaseHistory.length; i++)
          paidCraneList = (
            await prisma.paidCraneNames.findMany({ where: { purchaseHistoryId: purchaseHistory[i].id } })
          ).map((crane) => crane.craneName);

        const paidCraneListCount = paidCraneList.length;
        const allCraneListCount = allCraneList.length;
        let notPaidCraneList = allCraneList.splice(); //배열복사
        paidCraneList.forEach((crane) => {
          const index = notPaidCraneList.indexOf(crane);
          if (index >= 0) notPaidCraneList.splice(index, 1);
        });
        return { paidCraneList, paidCraneListCount, notPaidCraneList, allCraneListCount };
      } catch (e) {
        console.log("Error location: getPaidCraneNames.", e);
        throw new Error("ERROR: purchaseHistory를 받아오는데에 실패하였습니다.");
      }
    },
  },
};
