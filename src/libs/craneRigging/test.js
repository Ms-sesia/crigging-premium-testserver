import partsArray from "./libs/partsArray";
import startApp from "./libs/riggingData";

const workValue = {
  // input value
  safetyFactor: 85,
  craneLocation: "back", // front, back, side
  workWeight: 15.5,
  workBuilding: {
    // 크레인이 건물에 붙는 면을 가로.
    vertical: 20.73, //거리
    horizontal: 0,
    height: 45, //높이
  },
  block: {
    // vertical1: 10, //거리
    // horizontal1: 0,
    // height1: 10, //높이
    // vertical2: 5, //여유거리
    // height2: 0,
    // vertical1: 0, //거리
    // horizontal1: 0,
    // height1: 0, //높이
    // vertical2: 0, //여유거리
    // height2: 0,
  },
};

const unlockedCraneName = [
  "L_1030_2.1",
  "L_1040_2.1",
  "L_1050_3.1",
  "L_1055_3.2",
  "L_1060_3.1",
  "L_1070_4.1",
  "L_1070_4.2",
  "L_1090_4.1",
  "L_1095_5.1",
  "L_1100_4.2",
  "L_1100_5.2",
  "L_11200_9.1",
  "L_1130_5.1",
  "L_1150_6.1",
  "L_1200_5.1",
  "L_1250_6.1",
  "L_1300_6.1",
  "L_1300_6.2",
  "L_1350_6.1",
  "L_1400_7.1",
  "L_1450_8.1",
  "L_1500_50m_8.1",
  "L_1500_84m_8.1",
  "L_1750_9.1",
];
// const result = startApp(workValue);
// console.log(result);
// result.forEach((data) => console.log(data.riggingData.workBuilding, data.riggingData.block));
// partsArray(result);
// console.log(partsArray(craneData));

// const partsInfoData = partsArray(craneData);

const craneDataCal = startApp(workValue, unlockedCraneName);
console.log("결과물", craneDataCal);
// console.log(craneDataCal);
// craneDataCal.forEach((data) => {
//   console.log(data.craneName);
// console.log(data.craneCode);
// });
// console.log(craneDataCal);
// const partsInfoData = partsArray(craneDataCal[18]);
// const partsInfoData = partsArray(craneDataCal[craneDataCal.length-1]);
// const partsInfoData = partsArray(craneDataCal[46]);
// console.log(craneDataCal[46]);
// console.log('-------------------------------------------------------------------------------');
// console.log("partsList", partsInfoData.partsList);
// console.log("-------------------------------------------------------------------------------");
// console.log("allPartsData", partsInfoData.partsData);
// console.log("-------------------------------------------------------------------------------");
// console.log("marker", partsInfoData.partsData.BODY.marker);
// console.log("-------------------------------------------------------------------------------");
// console.log("connectionData", partsInfoData.connectionData);
