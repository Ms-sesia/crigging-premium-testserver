import { PrismaClient } from ".prisma/client";
import { sendSecretSMS } from "../../../libs/utils";

const prisma = new PrismaClient();
// 웹에서 사용하는 결제 인증용 resolver
export default {
  Query: {
    requestPurchaseAuthCode: async (_, args, __) => {
      const { phoneNumber } = args;
      try {
        const tmpPCH = await prisma.tmpPurchaseHistory.findUnique({ where: { phoneNumber } });

        const authCode = tmpPCH.authCode;
        await sendSecretSMS(phoneNumber, "authCode", authCode);
        return true;
      } catch (e) {
        console.log("Error location: requestPurchaseAuthCode.", e);
        throw new Error("결제인증번호 전송에 실패하였습니다.");
      }
    },
  },
};
