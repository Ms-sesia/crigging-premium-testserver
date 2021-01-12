import CraneRigging from "../../../../libs/craneCadImage";
import { getCraneRiggingParts } from "../../../../libs/craneRigging";

export default {
  Mutation: {
    getRiggingImage: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { craneData } = args;
      const riggingParts = getCraneRiggingParts(craneData);
      const craneInfo = { craneData, ...riggingParts };
      try {
        return CraneRigging(craneInfo);
      } catch (e) {
        throw new Error("ERROR: 이미지 생성에 실패하였습니다.");
      }
    },
  },
};
