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


// [
//   {
//     craneName: 'L_1500_84m_8.1',
//     craneCode: 'TY3F',
//     craneModeName: 'FIX',
//     excelSheetName: 'TY3F_165t_TAB231466.4',
//     paid: true,
//     craneData: {
//       mainBoom: 78.6,
//       mainAngle: 65,
//       totalExtLength: 2.2,
//       adapter1: 2.2,
//       extBoom1: 0,
//       extBoom2: 0,
//       extBoom3: 0,
//       extBoom4: 0,
//       adapter2: 0,
//       flyFixLuffing: 14,
//       flyFixLuffingAngle: 20,
//       distance1: 34.1,
//       distance2: 9.9,
//       craneDistance: 6.025,
//       edgeDistance: [Object],
//       centerToBuildingDistance: 44,
//       centerToBlockDistance: 23.3,
//       craneToBuildingDistance: 38,
//       craneToBlockDistance: 17.2,
//       totalDistance: 44,
//       tableDistance: 44,
//       height1: 73.2,
//       height2: 9.9,
//       totalHeight: 85.1,
//       marginHeight: 4.1,
//       workingArea: 360,
//       tableWeight: 16.8,
//       counterWeight: '165',
//       overRear: 'x',
//       optional: 'x',
//       safetyFactor: 78.4,
//       craneLocation: 'back',
//       workWeight: 15.5,
//       workBuilding: [Object],
//       block: [Object]
//     }
//   },
//   {
//     craneName: 'L_1500_84m_8.1',
//     craneCode: 'TY3EF',
//     craneModeName: 'FIX',
//     excelSheetName: 'TY3EF_165t_TAB232049.4',
//     paid: true,
//     craneData: {
//       mainBoom: 78.6,
//       mainAngle: 65,
//       totalExtLength: 2.2,
//       adapter1: 2.2,
//       extBoom1: 0,
//       extBoom2: 0,
//       extBoom3: 0,
//       extBoom4: 0,
//       adapter2: 0,
//       flyFixLuffing: 14,
//       flyFixLuffingAngle: 20,
//       distance1: 34.1,
//       distance2: 9.9,
//       craneDistance: 6.025,
//       edgeDistance: [Object],
//       centerToBuildingDistance: 44,
//       centerToBlockDistance: 23.3,
//       craneToBuildingDistance: 38,
//       craneToBlockDistance: 17.2,
//       totalDistance: 44,
//       tableDistance: 44,
//       height1: 73.2,
//       height2: 9.9,
//       totalHeight: 85.1,
//       marginHeight: 4.1,
//       workingArea: 360,
//       tableWeight: 16,
//       counterWeight: '165',
//       overRear: 'x',
//       optional: 'x',
//       safetyFactor: 82.3,
//       craneLocation: 'back',
//       workWeight: 15.5,
//       workBuilding: [Object],
//       block: [Object]
//     }
//   },
//   {
//     craneName: 'L_1500_84m_8.1',
//     craneCode: 'TN',
//     craneModeName: 'LUFFING',
//     excelSheetName: 'TN_135t_TAB231545.2',
//     paid: true,
//     craneData: {
//       mainBoom: 47.3,
//       mainAngle: 83,
//       totalExtLength: 4,
//       adapter1: 4,
//       extBoom1: 0,
//       extBoom2: 0,
//       extBoom3: 0,
//       extBoom4: 0,
//       adapter2: 0,
//       flyFixLuffing: 42,
//       flyFixLuffingAngle: 34.4,
//       distance1: 6.3,
//       distance2: 27.7,
//       craneDistance: 6.025,
//       edgeDistance: [Object],
//       centerToBuildingDistance: 34,
//       centerToBlockDistance: 13.3,
//       craneToBuildingDistance: 28,
//       craneToBlockDistance: 7.2,
//       totalDistance: 34,
//       tableDistance: 34,
//       height1: 50.9,
//       height2: 31.5,
//       totalHeight: 84.4,
//       marginHeight: 3.4,
//       workingArea: 360,
//       tableWeight: 22,
//       counterWeight: '135',
//       overRear: 'x',
//       optional: 'x',
//       safetyFactor: 59.9,
//       craneLocation: 'back',
//       workWeight: 15.5,
//       workBuilding: [Object],
//       block: [Object]
//     }
//   },
//   {
//     craneName: 'L_1500_84m_8.1',
//     craneCode: 'TY3N',
//     craneModeName: 'LUFFING',
//     excelSheetName: 'TY3N_165t_TAB231162.1',
//     paid: true,
//     craneData: {
//       mainBoom: 47.3,
//       mainAngle: 83,
//       totalExtLength: 4,
//       adapter1: 4,
//       extBoom1: 0,
//       extBoom2: 0,
//       extBoom3: 0,
//       extBoom4: 0,
//       adapter2: 0,
//       flyFixLuffing: 42,
//       flyFixLuffingAngle: 34.4,
//       distance1: 6.3,
//       distance2: 27.7,
//       craneDistance: 6.025,
//       edgeDistance: [Object],
//       centerToBuildingDistance: 34,
//       centerToBlockDistance: 13.3,
//       craneToBuildingDistance: 28,
//       craneToBlockDistance: 7.2,
//       totalDistance: 34,
//       tableDistance: 34,
//       height1: 50.9,
//       height2: 31.5,
//       totalHeight: 84.4,
//       marginHeight: 3.4,
//       workingArea: 360,
//       tableWeight: 37.5,
//       counterWeight: '135',
//       overRear: 'x',
//       optional: 'x',
//       safetyFactor: 35.1,
//       craneLocation: 'back',
//       workWeight: 15.5,
//       workBuilding: [Object],
//       block: [Object]
//     }
//   },
//   {
//     craneName: 'L_1500_84m_8.1',
//     craneCode: 'TY3SN',
//     craneModeName: 'LUFFING',
//     excelSheetName: 'TY3SN_165t_TAB231373.1',
//     paid: true,
//     craneData: {
//       mainBoom: 47.3,
//       mainAngle: 83,
//       totalExtLength: 4,
//       adapter1: 4,
//       extBoom1: 0,
//       extBoom2: 0,
//       extBoom3: 0,
//       extBoom4: 0,
//       adapter2: 0,
//       flyFixLuffing: 42,
//       flyFixLuffingAngle: 34.4,
//       distance1: 6.3,
//       distance2: 27.7,
//       craneDistance: 6.025,
//       edgeDistance: [Object],
//       centerToBuildingDistance: 34,
//       centerToBlockDistance: 13.3,
//       craneToBuildingDistance: 28,
//       craneToBlockDistance: 7.2,
//       totalDistance: 34,
//       tableDistance: 34,
//       height1: 50.9,
//       height2: 31.5,
//       totalHeight: 84.4,
//       marginHeight: 3.4,
//       workingArea: 360,
//       tableWeight: 40,
//       counterWeight: '165',
//       overRear: 'x',
//       optional: 'x',
//       safetyFactor: 32.9,
//       craneLocation: 'back',
//       workWeight: 15.5,
//       workBuilding: [Object],
//       block: [Object]
//     }
//   },
//   {
//     craneName: 'L_1500_84m_8.1',
//     craneCode: 'TY3NZF',
//     craneModeName: 'FIX',
//     excelSheetName: 'TY3NZF_165t_TAB231412.4',
//     paid: true,
//     craneData: {
//       mainBoom: 78.6,
//       mainAngle: 65,
//       totalExtLength: 2.2,
//       adapter1: 2.2,
//       extBoom1: 0,
//       extBoom2: 0,
//       extBoom3: 0,
//       extBoom4: 0,
//       adapter2: 0,
//       flyFixLuffing: 14,
//       flyFixLuffingAngle: 20,
//       distance1: 34.1,
//       distance2: 9.9,
//       craneDistance: 6.025,
//       edgeDistance: [Object],
//       centerToBuildingDistance: 44,
//       centerToBlockDistance: 23.3,
//       craneToBuildingDistance: 38,
//       craneToBlockDistance: 17.2,
//       totalDistance: 44,
//       tableDistance: 44,
//       height1: 73.2,
//       height2: 9.9,
//       totalHeight: 85.1,
//       marginHeight: 4.1,
//       workingArea: 360,
//       tableWeight: 16.5,
//       counterWeight: '165',
//       overRear: 'x',
//       optional: 'x',
//       safetyFactor: 79.8,
//       craneLocation: 'back',
//       workWeight: 15.5,
//       workBuilding: [Object],
//       block: [Object]
//     }
//   },
//   {
//     craneName: 'L_1500_84m_8.1',
//     craneCode: 'TY3ENZF',
//     craneModeName: 'FIX',
//     excelSheetName: 'TY3ENZF_165t_TAB232103.4',
//     paid: true,
//     craneData: {
//       mainBoom: 78.6,
//       mainAngle: 65,
//       totalExtLength: 2.2,
//       adapter1: 2.2,
//       extBoom1: 0,
//       extBoom2: 0,
//       extBoom3: 0,
//       extBoom4: 0,
//       adapter2: 0,
//       flyFixLuffing: 14,
//       flyFixLuffingAngle: 20,
//       distance1: 34.1,
//       distance2: 9.9,
//       craneDistance: 6.025,
//       edgeDistance: [Object],
//       centerToBuildingDistance: 44,
//       centerToBlockDistance: 23.3,
//       craneToBuildingDistance: 38,
//       craneToBlockDistance: 17.2,
//       totalDistance: 44,
//       tableDistance: 44,
//       height1: 73.2,
//       height2: 9.9,
//       totalHeight: 85.1,
//       marginHeight: 4.1,
//       workingArea: 360,
//       tableWeight: 16.4,
//       counterWeight: '165',
//       overRear: 'x',
//       optional: 'x',
//       safetyFactor: 80.3,
//       craneLocation: 'back',
//       workWeight: 15.5,
//       workBuilding: [Object],
//       block: [Object]
//     }
//   }
// ]