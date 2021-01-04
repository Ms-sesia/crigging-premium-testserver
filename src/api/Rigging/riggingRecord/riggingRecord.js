import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Mutation: {
    riggingRecord: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const {
        craneData: { craneName, craneCode, craneModeName, excelSheetName, craneData },
        riggingIndex,
      } = args;
      const {
        mainBoom,
        mainAngle,
        totalExtLength,
        adapter1,
        extBoom1,
        extBoom2,
        extBoom3,
        extBoom4,
        adapter2,
        flyFixLuffing,
        flyFixLuffingAngle,
        distance1,
        distance2,
        craneDistance,
        edgeDistance,
        centerToBuildingDistance,
        centerToBlockDistance,
        craneToBuildingDistance,
        craneToBlockDistance,
        totalDistance,
        tableDistance,
        height1,
        height2,
        totalHeight,
        marginHeight,
        workingArea,
        tableWeight,
        counterWeight,
        overRear,
        optional,
        safetyFactor,
        craneLocation,
        workWeight,
        workBuilding,
        block,
      } = craneData;

      try {
        const EdgeDistacne = await prisma.edgeDistance.create({
          data: {
            mainToBlock: edgeDistance.mainToBlock,
            mainToBuilding: edgeDistance.mainToBuilding,
            flyFixLuffingToBlock: edgeDistance.flyFixLuffingToBlock,
            flyFixLuffingToBuilding: edgeDistance.flyFixLuffingToBuilding,
          },
        });
        const WorkBuilding = await prisma.workBuilding.create({
          data: {
            horizontal: workBuilding.horizontal,
            vertical: workBuilding.vertical,
            height: workBuilding.height,
          },
        });
        const Block = await prisma.block.create({
          data: {
            vertical1: block.vertical1,
            horizontal1: block.horizontal1,
            height1: block.height1,
            vertical2: block.vertical2,
            height2: block.height2,
          },
        });

        const RiggingData = await prisma.riggingData.create({
          data: {
            mainBoom,
            mainAngle,
            totalExtLength,
            adapter1,
            extBoom1,
            extBoom2,
            extBoom3,
            extBoom4,
            adapter2,
            flyFixLuffing,
            flyFixLuffingAngle,
            distance1,
            distance2,
            craneDistance,
            edgeDistance: { connect: { id: EdgeDistacne.id } },
            centerToBuildingDistance,
            centerToBlockDistance,
            craneToBuildingDistance,
            craneToBlockDistance,
            totalDistance,
            tableDistance,
            height1,
            height2,
            totalHeight,
            marginHeight,
            workingArea,
            tableWeight,
            counterWeight,
            overRear,
            optional,
            safetyFactor,
            craneLocation,
            workWeight,
            workBuilding: { connect: { id: WorkBuilding.id } },
            block: { connect: { id: Block.id } },
          },
        });
        await prisma.craneData.create({
          data: {
            riggingIndex,
            craneName,
            craneCode,
            craneModeName,
            excelSheetName,
            riggingData: { connect: { id: RiggingData.id } },
            user: { connect: { id: user.id } },
          },
        });
        return true;
      } catch {
        throw new Error("저장하려는 데이터에 오류가 있습니다.");
      }
    },
  },
};
