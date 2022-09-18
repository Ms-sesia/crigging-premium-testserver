const {getPoint} = require("./utils");
const LineMarkerModule = require("./LineMarkerModule");

function edgeDistance (ppm, buildingPoint, blockPoint, {mainToBlock, mainToBuilding, flyFixLuffingToBlock, flyFixLuffingToBuilding}, ctx) {
    // 거리 값을 픽셀로 바꾸기 위해 ppm 필요
    // buildPoint 필요 빌딩 끝에서 부터 표시 하기위해 
    // lindMarkerModule필요
    // buidingPoint.x - value

    const pointFromBuildingEdge = getPoint(buildingPoint, ppm);
    const pointFromBlockEdge = getPoint(blockPoint, ppm);

    let buildingToMainBoomLine, blockToMainBoomLine, blockToFlyFixLuffingLine, buildingToFlyFixLuffingLine;

    if(mainToBlock) {
        const blockToMainBoomPoint = pointFromBlockEdge(-mainToBlock);
        blockToMainBoomLine = new LineMarkerModule(
            ctx,
            {...blockToMainBoomPoint},
            {...blockPoint},
            mainToBlock,
            15, 15, 30,
            36);
        blockToMainBoomLine.calculateGuidelinePosition().applyOffset(0, 'down'); // 값이 없으면 표시하지 않을것이다
    }   
    if(mainToBuilding) {
        const buildingToMainBoomPoint = pointFromBuildingEdge(-mainToBuilding);
        buildingToMainBoomLine = new LineMarkerModule(
            ctx,
            {...buildingToMainBoomPoint},
            {...buildingPoint},
            mainToBuilding,
            15, 15, 30,
            36);
        buildingToMainBoomLine.calculateGuidelinePosition().applyOffset(0, 'down'); // 값이 없으면 표시하지 않을것이다

    } 
    if(flyFixLuffingToBlock) {
        const blockToFlyFixLuffingPoint = pointFromBlockEdge(-flyFixLuffingToBlock);
        blockToFlyFixLuffingLine = new LineMarkerModule(
            ctx,
            {...blockToFlyFixLuffingPoint},
            {...blockPoint},
            mainToBlock,
            15, 15, 30,
            36);
        blockToFlyFixLuffingLine.calculateGuidelinePosition().applyOffset(0, 'down'); // 값이 없으면 표시하지 않을것이다
    }
    if(flyFixLuffingToBuilding) {
        const buildingToFlyFixLuffingPoint = pointFromBuildingEdge(-flyFixLuffingToBuilding);
        buildingToFlyFixLuffingLine = new LineMarkerModule(
            ctx,
            {...buildingToFlyFixLuffingPoint},
            {...buildingPoint},
            mainToBuilding,
            15, 15, 30,
            36);
            buildingToFlyFixLuffingLine.calculateGuidelinePosition().applyOffset(0, 'down'); // 값이 없으면 표시하지 않을것이다
    }
    return [buildingToMainBoomLine, blockToMainBoomLine, buildingToFlyFixLuffingLine, blockToFlyFixLuffingLine]
}
module.exports = edgeDistance;