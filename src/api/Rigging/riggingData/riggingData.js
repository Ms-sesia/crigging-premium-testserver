import getRiggingData from "../../../../libs/craneRigging/libs/riggingData";

export default {
  Mutation: {
    riggingData: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { safetyFactor, craneLocation, workBuilding, workWeight, block } = args;
      const riggingInputData = {
        safetyFactor,
        craneLocation, // front, back, side
        workWeight,
        workBuilding,
        block,
      };
      const riggingData = getRiggingData(riggingInputData);
      const jsontest = JSON.stringify(riggingData[riggingData.length - 1]);
      console.log(riggingData[riggingData.length - 1]);
      console.log(jsontest);
      console.log(JSON.parse(jsontest));

      return getRiggingData(riggingInputData);
    },
  },
};
