import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Query: {
    loadRiggingData: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const craneData = await prisma.craneData.findMany({
        take: 10,
        where: { userId: user.id },
        orderBy: { createdAt: "desc" },
      });

      try {
        return await Promise.all(
          craneData.map(async (craneInfo) => {
            const riggingData = await prisma.riggingData.findUnique({ where: { id: craneInfo.riggingDataId } });
            const edgeDistance = await prisma.edgeDistance.findUnique({ where: { id: riggingData.edgeDistanceId } });
            const workBuilding = await prisma.workBuilding.findUnique({ where: { id: riggingData.workBuildingId } });
            const block = await prisma.block.findUnique({ where: { id: riggingData.blockId } });
            return {
              craneName: craneInfo.craneName,
              craneCode: craneInfo.craneCode,
              craneModeName: craneInfo.craneModeName,
              excelSheetName: craneInfo.excelSheetName,
              craneData: {
                mainBoom: riggingData.mainBoom,
                mainAngle: riggingData.mainAngle,
                totalExtLength: riggingData.totalExtLength,
                adapter1: riggingData.adapter1,
                extBoom1: riggingData.extBoom1,
                extBoom2: riggingData.extBoom2,
                extBoom3: riggingData.extBoom3,
                extBoom4: riggingData.extBoom4,
                adapter2: riggingData.adapter2,
                flyFixLuffing: riggingData.flyFixLuffing,
                flyFixLuffingAngle: riggingData.flyFixLuffingAngle,
                distance1: riggingData.distance1,
                distance2: riggingData.distance2,
                craneDistance: riggingData.craneDistance,
                edgeDistance: {
                  mainToBlock: edgeDistance.mainToBlock,
                  mainToBuilding: edgeDistance.mainToBuilding,
                  flyFixLuffingToBlock: edgeDistance.flyFixLuffingToBlock,
                  flyFixLuffingToBuilding: edgeDistance.flyFixLuffingToBuilding,
                },
                centerToBuildingDistance: riggingData.centerToBuildingDistance,
                centerToBlockDistance: riggingData.centerToBlockDistance,
                craneToBuildingDistance: riggingData.craneToBuildingDistance,
                craneToBlockDistance: riggingData.craneToBlockDistance,
                totalDistance: riggingData.totalDistance,
                tableDistance: riggingData.tableDistance,
                height1: riggingData.height1,
                height2: riggingData.height2,
                totalHeight: riggingData.totalHeight,
                marginHeight: riggingData.marginHeight,
                workingArea: riggingData.workingArea,
                tableWeight: riggingData.tableWeight,
                counterWeight: riggingData.counterWeight,
                overRear: riggingData.overRear,
                optional: riggingData.optional,
                safetyFactor: riggingData.safetyFactor,
                craneLocation: riggingData.craneLocation,
                workWeight: riggingData.workWeight,
                workBuilding: {
                  horizontal: workBuilding.horizontal,
                  vertical: workBuilding.vertical,
                  height: workBuilding.height,
                },
                block: {
                  vertical1: block.vertical1,
                  horizontal1: block.horizontal1,
                  height1: block.height1,
                  vertical2: block.vertical2,
                  height2: block.height2,
                },
              },
            };
          })
        );
      } catch (e) {
        throw new Error("ERROR: 리깅기록을 불러오는데 실패하였습니다.");
      }
    },
  },
};
