import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Query: {
    loadRiggingData: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { userId } = args.userId;
      const craneData = await prisma.craneData.findMany();
      try {
        const riggingData = await prisma.riggingData.findUnique({
          where: { id: craneData[0].riggingDataId },
        });
        const edgeDistance = await prisma.edgeDistance.findUnique({
          where: { id: riggingData.edgeDistanceId },
        });
        const workBuilding = await prisma.workBuilding.findUnique({
          where: { id: riggingData.workBuildingId },
        });
        const block = await prisma.block.findUnique({
          where: { id: riggingData.blockId },
        });
        console.log(craneData[0], { riggingData, edgeDistance, workBuilding, block });
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};
