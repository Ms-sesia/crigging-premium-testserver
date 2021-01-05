const { createCanvas } = require('canvas')
const fs =require('fs');
const {getPoint, getPixelPerMeter} = require("./libs/utils");
const getCraneRiggingInfo = require('./libs/getCraneRiggingInfo');
const drawImage = require('./libs/drawImage');
const saveImage = require('./libs/saveImage');
const ppm = require('./libs/pixelPerMeter'); 

async function CraneRigging(craneInfo) {

  // canvas의 크기와 옵셋 설정
  const craneData = craneInfo.craneData.craneData;
  const partsData = craneInfo.partsData;

  // config
  // let pixelPerMeter = getPixelPerMeter(partsData); // old Version 삭제 예정
  const offSetX = 200;
  let offSetY = 0;
  let canvasWidth;
  let canvasHeight;
  const craneName = craneInfo.craneData.craneName;
  let pixelPerMeter = ppm[craneName]; //1m에 몇 픽셀인지 계산
  
  
  const pointFromOrigin = getPoint({x: 0, y: 0}, pixelPerMeter);
  const totalDistance = pointFromOrigin(craneData.totalDistance);
  const totalHeight = pointFromOrigin(craneData.totalHeight);

  canvasWidth = totalDistance.x + 1200; // 전체 크레인 폭에서 1000px 추가 해서 공간 만들기
  canvasHeight = totalHeight.x + 2000; // 전체 크레인 길이에서 1000px 추가 해서 공간 만들기
  offSetY = canvasHeight - 500; // 크레인 바닥에 길이 표시를 위한 공간 만들기

  const canvas = createCanvas(canvasWidth, canvasHeight);

  const canvasRef = canvas;
  // let markerRef = {};

  const { modParts, buildParts } = await getCraneRiggingInfo(craneInfo, canvasRef, offSetX, offSetY, pixelPerMeter);
  await drawImage(modParts, buildParts);
  // await saveImage(canvasRef);

  return canvas.toDataURL();
}

module.exports = CraneRigging;