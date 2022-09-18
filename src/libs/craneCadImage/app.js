// const fs = require('fs')

// import partsArray from "./libs/libs/partsArray";
// import startApp from "./libs/libs/riggingData";
// const CraneRigging = require('./index');

// const workValue = { // input value
//   safetyFactor : 85,
//   craneLocation : 'back',  // front, back, side

//   workWeight : 25,
//   workBuilding: {  // 크레인이 건물에 붙는 면을 가로.
//     vertical : 5,
//     horizontal : 5,
//     height : 110,
//   },
//   block : {
//     vertical1: 0,
//     horizontal1: 0,
//     height1: 0,
//     vertical2: 0,
//     height2: 0
//   },
// }
// const craneDataCal = startApp(workValue);
// const craneData = craneDataCal[2]
// const _ = partsArray(craneData);
// const data = {craneData, partsData:_.partsData, partsList: _.partsList, connectionData: _.connectionData };

// CraneRigging(data).then((imageData) => {
//   fs.writeFileSync('./image.txt', imageData);
// });


