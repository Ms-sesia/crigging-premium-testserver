import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const unlockedCraneName = [
  "L_1030_2.1",
  "L_1040_2.1",
  "L_1050_3.1",
  "L_1055_3.2",
  "L_1060_3.1",
  "L_1070_4.1",
  "L_1070_4.2",
  "L_1090_4.1",
  "L_1095_5.1",
  "L_1100_4.2",
  "L_1100_5.2",
  "L_11200_9.1",
  "L_1130_5.1",
  "L_1150_6.1",
  "L_1200_5.1",
  "L_1250_6.1",
  "L_1300_6.1",
  "L_1300_6.2",
  "L_1350_6.1",
  "L_1400_7.1",
  "L_1450_8.1",
  "L_1500_50m_8.1",
  "L_1500_84m_8.1",
  "L_1750_9.1",
];

export default {
  Mutation: {
    createUser: async (_, args, { request }) => {
      const { email, name, phoneNumber } = args;
      try {
        const user = await prisma.user.findMany({
          where: {
            OR: [{ email: { contains: email } }, { phoneNumber: { contains: phoneNumber } }],
          },
        });
        if (user.length) throw 1;

        const createUser = await prisma.user.create({
          data: { name, email, phoneNumber },
        });
        const purchaseHistory = await prisma.purchaseHistory.create({
          data: {
            price: 192000,
            user: { connect: { id: createUser.id } },
          },
        });
        for (let i = 0; i < unlockedCraneName.length; i++) {
          await prisma.paidCraneNames.create({
            data: {
              craneName: unlockedCraneName[i],
              purchaseHistory: { connect: { id: purchaseHistory.id } },
            },
          });
        }
        return true;
        // await prisma.user.create({
        //   data: {
        //     name,
        //     email,
        //     phoneNumber,
        //   },
        // });
        // return true;
      } catch (e) {
        console.log("Error location: createUser", e);
        if (e === 1) throw new Error("이미 사용중인 핸드폰번호 입니다.");
        throw new Error("ERROR: 유저를 생성하지 못하였습니다.");
      }
    },
  },
};
