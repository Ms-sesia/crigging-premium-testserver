// craneData: 크레인의 각도 붐길이 건물 위치 픽스 길이 등등의 정보
// partsData: 파츠의 좌표 wire의 좌표 이미지 위치 등등의 정보 배열
// partsList: 조홥되어야할 파츠들의 List 배열

function convertCraneData({ craneData }, partsData, partsList) {
  let moduleDetailArr = [];

  for( let i=0 ; i<partsList.length ; i++) {
    const moduleName = partsList[i];
    moduleDetailArr.push(partsData[moduleName]);
    // console.log(partsData);
    switch(partsData[moduleName]?.type){
      case 'bodyParts': {
        partsData[moduleName].angle = 0;
        break;
      }
      case 'mainParts': {
        partsData[moduleName].angle = craneData.mainAngle;
        partsData[moduleName].mainAngle = craneData.mainAngle;
        // partsData[moduleName].length = craneData.mainBoom;
        break;
      }
      case 'boomParts': {
        partsData[moduleName].angle = craneData.mainAngle;
        partsData[moduleName].mainAngle = craneData.mainAngle;
        partsData[moduleName].length = craneData.mainBoom;
        break;
      }
      case 'jibParts': {
        partsData[moduleName].angle = (craneData.mainAngle - craneData.flyFixLuffingAngle);
        partsData[moduleName].mainAngle = craneData.mainAngle;
        partsData[moduleName].flyFixLuffingAngle = craneData.flyFixLuffingAngle;
        // partsData[moduleName].length = craneData.flyFixLuffing;
        break;
      }
      case 'addParts':
        if (partsData[moduleName].name === 'L'){
          partsData[moduleName].angle = (craneData.mainAngle - craneData.flyFixLuffingAngle);
          partsData[moduleName].mainAngle = craneData.mainAngle;
          break;
        } else if (partsData[moduleName].name === 'Y'){
          partsData[moduleName].angle = craneData.mainAngle;
          partsData[moduleName].mainAngle = craneData.mainAngle;
          break;
        }
      break;
      default : {
        console.log("해당값이 없다",moduleName);
        // partsData[moduleName].angle = 0;
      }
    }
  }
  return moduleDetailArr;
}

module.exports = convertCraneData;
