import { PrismaClient } from ".prisma/client";

const prisma = new PrismaClient();

export default {
  Query: {
    confirmPurchaseAuthCode: async (_, args, __) => {
      const { phoneNumber, authCode } = args;
      try {
        const tmpPCH = await prisma.tmpPurchaseHistory.findUnique({
          where: { phoneNumber },
        });
        if (tmpPCH.authCode === authCode) return tmpPCH;
      } catch (e) {
        console.log("Error location: confirmPurchaseAuthCode.", e);
      }
    },
  },
};
