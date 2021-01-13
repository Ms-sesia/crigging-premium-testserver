const convertCraneData = require("../convertCraneData");
const {wirePoints } = require("../getWireComposition");
const drawWire = require('../drawWire');
const getCraneCoordinate = require('./getCraneCoordinate');
const getBuildingCoordinate = require('./getBuildingCoordinate');

// 기존의 useEffect 부분
// 크레인 이미지 좌표 정보 계산
function getCraneRiggingInfo(craneInfo, canvasRef, offSetX, offSetY, pixelPerMeter) {
  // let modParts = [];
  // let buildParts = [];

  return new Promise(async (resolve) => {
    const {craneData, partsData, partsList, connectionData: wireData} = craneInfo;

    if (craneData && partsData && partsList) {
      const modulesA = convertCraneData(craneData, partsData, partsList); //크레인정보 입력된 데이터 객체

      let {modParts, markerRef, transParts} = await getCraneCoordinate(canvasRef, modulesA, craneData, offSetX, offSetY, pixelPerMeter).catch((err) => {
        console.log(err)
      });
      // console.log(markerRef);
      const buildParts = await getBuildingCoordinate(canvasRef, craneData, markerRef, offSetX, offSetY, pixelPerMeter).catch((err) => {
        console.log(err)
      });

      // draw wire Lines
      // const wireModules = getWireComposition(craneData.wire);
      if (wireData) {
        const points = wirePoints(wireData, transParts);
        const ctx = canvasRef.getContext('2d');
        drawWire(points, ctx);
      }
      resolve({modParts, buildParts})
    }
  })
}

module.exports = getCraneRiggingInfo;