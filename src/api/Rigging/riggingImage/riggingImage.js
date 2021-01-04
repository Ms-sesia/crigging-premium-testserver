import CraneRigging from "../../../../libs/craneCadImage";
import { getCraneRiggingParts } from "../../../../libs/craneRigging";

export default {
  Mutation: {
    riggingImage: async (_, args, { request }) => {
      const { craneData } = args;
      // const riggingData = JSON.parse(_craneData);
      const riggingParts = getCraneRiggingParts(craneData);
      const craneInfo = { craneData, ...riggingParts };
      // CraneRigging(craneInfo);
      console.log(CraneRigging(craneInfo));
    },
  },
};
