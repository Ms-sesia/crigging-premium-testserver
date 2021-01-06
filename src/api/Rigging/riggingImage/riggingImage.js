import CraneRigging from "../../../../libs/craneCadImage";
import { getCraneRiggingParts } from "../../../../libs/craneRigging";

export default {
  Mutation: {
    riggingImage: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { craneData } = args;
      const riggingParts = getCraneRiggingParts(craneData);
      const craneInfo = { craneData, ...riggingParts };
      // CraneRigging(craneInfo);
      try {
        console.log("Image craete success.");
        return CraneRigging(craneInfo);
      } catch (e) {
        console.log("Image create fail.");
        throw new Error(e);
      }
    },
  },
};
