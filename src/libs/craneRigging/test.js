import partsArray from "./libs/partsArray";
import startApp from "./libs/riggingData";

const workValue = {
  // input value
  safetyFactor: 85,
  craneLocation: "back", // front, back, side
  workWeight: 15.5,
  workBuilding: {
    // 크레인이 건물에 붙는 면을 가로.
    vertical: 0, //거리
    horizontal: 0,
    height: 75, //높이
  },
  block: {
    vertical1: 20.73, //거리
    horizontal1: 0,
    height1: 45, //높이
    vertical2: 0, //여유거리
    height2: 0,
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

const craneDataCal = startApp(workValue, unlockedCraneName);
console.log(craneDataCal);
// craneDataCal.forEach((data, index) => {
//   console.log(data.craneName);
//   console.log(data.craneCode);
//   console.log(data.craneModeName);
//   console.log(data.craneData);
//   console.log("------------------------------------------------------------------");
// });


//* ------ getRiggingData form -------
// mutation {
//   getRiggingData(
//     safetyFactor: 85
//     craneLocation: "back"
//     workWeight: 15.5
//     workBuilding: { vertical: 1, horizontal: 0, height: 75 }
//     block: {
//       vertical1: 20.73
//       horizontal1: 0
//       height1: 45
//       vertical2: 0
//       height2: 0
//     }
//     paidCraneNames: [
//       "L_1030_2.1"
//       "L_1040_2.1"
//       "L_1050_3.1"
//       "L_1055_3.2"
//       "L_1060_3.1"
//       "L_1070_4.1"
//       "L_1070_4.2"
//       "L_1090_4.1"
//       "L_1095_5.1"
//       "L_1100_4.2"
//       "L_1100_5.2"
//       "L_11200_9.1"
//       "L_1130_5.1"
//       "L_1150_6.1"
//       "L_1200_5.1"
//       "L_1250_6.1"
//       "L_1300_6.1"
//       "L_1300_6.2"
//       "L_1350_6.1"
//       "L_1400_7.1"
//       "L_1450_8.1"
//       "L_1500_50m_8.1"
//       "L_1500_84m_8.1"
//       "L_1750_9.1"
//     ]
//   ) {
//     craneName
//     paid
//     craneCode
//     craneModeName
//     excelSheetName
//     craneData {
//       mainBoom
//       mainAngle
//       totalExtLength
//       adapter1
//       extBoom1
//       extBoom2
//       extBoom3
//       extBoom4
//       adapter2
//       flyFixLuffing
//       flyFixLuffingAngle
//       distance1
//       distance2
//       craneDistance
//       centerToBuildingDistance
//       centerToBlockDistance
//       craneToBuildingDistance
//       craneToBlockDistance
//       totalDistance
//       tableDistance
//       height1
//       height2
//       totalHeight
//       marginHeight
//       workingArea
//       tableWeight
//       counterWeight
//       overRear
//       optional
//       safetyFactor
//       craneLocation
//       workWeight
//       edgeDistance{
//         mainToBlock
//         mainToBuilding
//         flyFixLuffingToBlock
//         flyFixLuffingToBuilding
//       }
//       workBuilding{
//         horizontal
//         vertical
//         height
//       }
//       block{
//         vertical1
//         horizontal1
//         height1
//         vertical2
//         height2
//       }
//     }
//   }
// }

//* ------- getRiggingImage form --------

// craneName: "L_1500_84m_8.1",
// paid: true,
// craneCode: "TY3N",
// craneModeName: "LUFFING",
// excelSheetName: "TY3N_165t_TAB231162.1",mutation {
//   getRiggingImage(
//     craneData: {
//       craneName: "L_1500_84m_8.1"
//       craneCode: "TY3N"
//       craneModeName: "LUFFING"
//       excelSheetName: "TY3N_165t_TAB231162.1"
//       craneData: {
//         mainBoom: 47.3
//         mainAngle: 83
//         totalExtLength: 4
//         adapter1: 4
//         extBoom1: 0
//         extBoom2: 0
//         extBoom3: 0
//         extBoom4: 0
//         adapter2: 0
//         flyFixLuffing: 42
//         flyFixLuffingAngle: 34.4
//         distance1: 6.3
//         distance2: 27.7
//         craneDistance: 6.025
//         centerToBuildingDistance: 34
//         centerToBlockDistance: 13.3
//         craneToBuildingDistance: 28
//         craneToBlockDistance: 7.2
//         totalDistance: 34
//         tableDistance: 34
//         height1: 50.9
//         height2: 31.5
//         totalHeight: 84.4
//         marginHeight: 3.4
//         workingArea: 360
//         tableWeight: 37.5
//         counterWeight: "135"
//         overRear: "x"
//         optional: "x"
//         safetyFactor: 35.1
//         craneLocation: "back"
//         workWeight: 15.5
//         edgeDistance: {
//           mainToBlock: 8
//           mainToBuilding: 0
//           flyFixLuffingToBlock: 0
//           flyFixLuffingToBuilding: 3.2
//         }
//         workBuilding: { horizontal: 0, vertical: 0, height: 75 }
//         block: {
//           vertical1: 20.73
//           horizontal1: 0
//           height1: 45
//           vertical2: 0
//           height2: 0
//         }
//       }
//     }
//   )
// }
