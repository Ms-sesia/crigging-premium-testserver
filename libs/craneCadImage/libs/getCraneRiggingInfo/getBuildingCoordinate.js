const BuildingModule = require("../BuildingModule");
const LineMarkerModule = require("../LineMarkerModule");
const {getPoint} = require("../utils");

const getBuildingCoordinate = async (_canvasRef, {craneData}, markerRef,  offSetX, offSetY, pixelPerMeter) => {
  const ctx = _canvasRef.getContext('2d');
  console.log(markerRef);
  // 주어진 거리값[m]을 좌표값(x,y)으로 변환
  const pointFromCenter = getPoint({
    x: markerRef.center.x,
    y: markerRef.center.y
  }, pixelPerMeter);

  const blockPoint2 = pointFromCenter(craneData.centerToBlockDistance); // 중심에서 여유거리
  const blockPoint1 = pointFromCenter(craneData.centerToBlockDistance + craneData.block.vertical2); // 중심에서 장애물까지 거리
  const buildingPoint = pointFromCenter(craneData.centerToBuildingDistance);// 중심에서 건물까지 거리
  const rearPoint = pointFromCenter(craneData.craneDistance); // 중심에서 크레인 리어까지 거리
  const totalPoint = pointFromCenter(craneData.totalDistance); // 중심에서 크레인의 가장 끝(픽스 끝)까지 거리

  let blockPart; // 진짜 장애물
  let block2Part; // 작은 장애물
  if (craneData.block.vertical1) {
    blockPart = new BuildingModule(
      offSetX,
      offSetY,
      2,
      craneData.block.height1,
      'Block',
      ctx,
      pixelPerMeter,
      markerRef.center.x,
      craneData.centerToBlockDistance + craneData.block.vertical2,
      ['right'],
      0,
    );
  }
  if (craneData.block.vertical2) {
    block2Part = new BuildingModule(
      offSetX,
      offSetY,
      craneData.block.vertical2,
      0.01,
      'Building',
      ctx,
      pixelPerMeter,
      markerRef.center.x,
      craneData.centerToBlockDistance,
      ['bottom'],
      0,
    );
  }
  // 리깅할 건물
  const buildingPart = new BuildingModule(
    offSetX,
    offSetY,
    craneData.workBuilding.vertical,
    craneData.workBuilding.height,
    'Building',
    ctx,
    pixelPerMeter,
    markerRef.center.x,
    craneData.centerToBuildingDistance,
    ['right', 'bottom'],
    0,
  );
  // 투명 빌딩 
  const emptyBuildingPart = new BuildingModule(
    offSetX,
    offSetY - pixelPerMeter * craneData.workBuilding.height,
    craneData.workBuilding.vertical,
    craneData.totalHeight - craneData.workBuilding.height,
    'Empty',
    ctx,
    pixelPerMeter,
    markerRef.center.x,
    craneData.centerToBuildingDistance,
    ['right'],
    0,
  );

  // craneData에서 craneData를 추출하여
  // MarkerPoint 좌표 생성
  markerRef = {
    ...markerRef,
    rearPoint: {
      x: rearPoint.x,
      y: rearPoint.y,
      value: craneData.craneDistance
    },
    craneDistance: {
      x: rearPoint.x,
      y: rearPoint.y,
      value: craneData.craneDistance
    },
    blockDistance1: {
      x: blockPoint1.x,
      y: blockPoint1.y,
      value: craneData.centerToBlockDistance
    },
    blockDistance2: {
      x: blockPoint2.x,
      y: blockPoint2.y,
      value: craneData.centerToBlockDistance
    },
    buildingDistance: {
      x: buildingPoint.x,
      y: buildingPoint.y,
      value: craneData.centerToBuildingDistance
    },
    totalDistance: {
      x: totalPoint.x,
      y: totalPoint.y,
      value: craneData.totalDistance
    },
    blockToBuildingDistance: {
      x: 0,
      y: 0,
      value: craneData.totalHeight - craneData.workBuilding.height
    }
  }
  let blockLine = new LineMarkerModule(
    ctx,
    {...markerRef.center},
    {...markerRef.blockDistance2},
    markerRef.blockDistance2.value, 15, 15, 30);
  let craneDistanceLine = new LineMarkerModule(
    ctx,
    {...markerRef.center},
    {...markerRef.rearPoint},
    markerRef.craneDistance.value, 15, 15, 30);

  let totalDistanceLine = new LineMarkerModule(
    ctx,
    {...markerRef.center},
    {...markerRef.totalDistance},
    markerRef.totalDistance.value, 15, 15, 30);

  const blockToBuildingLine = new LineMarkerModule(
    ctx,
    {...markerRef.blockDistance1},
    {...markerRef.buildingDistance},
    markerRef.buildingDistance.value - (markerRef.blockDistance1.value + craneData.block.vertical2),
    15, 15, 30,
    36);
  // const buildingToCraneHeadValue = craneData.totalHeight - craneData.workBuilding.height;

  craneDistanceLine.calculateGuidelinePosition().applyOffset(100, 'down');
  blockLine.calculateGuidelinePosition().applyOffset(200, 'down');
  totalDistanceLine.calculateGuidelinePosition().applyOffset(300, 'down');
  blockToBuildingLine.calculateGuidelinePosition().applyOffset(48, 'down'); // 값이 없으면 표시하지 않을것이다

  const buildParts = [
    block2Part,
    buildingPart,
    emptyBuildingPart,
    blockPart,
    blockLine,
    craneDistanceLine,
    totalDistanceLine,
    blockToBuildingLine,
  ];
  return buildParts
}

module.exports = getBuildingCoordinate;