import getRiggingData from "../../../../libs/craneRigging/libs/riggingData";

export default {
  Mutation: {
    getRiggingData: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { safetyFactor, craneLocation, workBuilding, workWeight, block, unlockedCraneNames } = args;
      const riggingInputData = {
        safetyFactor,
        craneLocation, // front, back, side
        workWeight,
        workBuilding,
        block,
      };
      try {
        return getRiggingData(riggingInputData, unlockedCraneNames);
      } catch (e) {
        throw new Error("ERROR: riggingData의 return이 잘못되었습니다.");
      }
    },
  },
};
