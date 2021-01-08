import getRiggingData from "../../../../libs/craneRigging/libs/riggingData";

export default {
  Mutation: {
    getRiggingData: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { safetyFactor, craneLocation, workBuilding, workWeight, block } = args;
      const riggingInputData = {
        safetyFactor,
        craneLocation, // front, back, side
        workWeight,
        workBuilding,
        block,
      };
      return getRiggingData(riggingInputData);
    },
  },
};
