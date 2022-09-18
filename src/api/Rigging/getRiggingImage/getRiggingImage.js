import CraneRigging from "../../../libs/craneCadImage";
import { getCraneRiggingParts } from "../../../libs/craneRigging";
import path from "path";
import decodeBase64Image from "../../../libs/base64ToImage";

export default {
  Mutation: {
    getRiggingImage: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { craneData } = args;
      const { craneName, craneCode } = craneData;
      try {
        const riggingParts = getCraneRiggingParts(craneData);
        const craneInfo = { craneData, ...riggingParts };

        const text = await CraneRigging(craneInfo);
        const savePath = path.join(__dirname, "../../../../", "data/images/craneCadImage/");
        const optional = { fileName: craneName + "-" + craneCode, type: "png" };
        
        decodeBase64Image(text, savePath, optional);

        return optional.fileName + "." + optional.type;
      } catch (e) {
        console.log(e);
        throw new Error("ERROR: 이미지 생성에 실패하였습니다.");
      }
    },
  },
};
