const CraneModule = require('../CraneModule');
const LineMarkerModule = require("../LineMarkerModule");
const AngleMarker = require("../AngleMarker");


const getCraneCoordinate = async (_canvasRef, modules, {craneData}, offSetX, offSetY) => {
  let prevPartsNextCoord = {x: 0, y: 0}; // 이전 파츠 값을 저장하기위한 좌표
  let additionalParts = {}; //추가 파츠 좌표 저장 객체
  let markerRef = {};
  let transParts = {};

  /* parts 모듈 생성 */
  const modParts = modules.map((part,index) => {
    const ctx = _canvasRef.getContext('2d');

    // 추가 파츠일경우 추가파츠 부착위치를 적용
    if (part.type === 'addParts') {
      const refCode = part.refCode;
      prevPartsNextCoord.x = additionalParts[refCode].x;
      prevPartsNextCoord.y = additionalParts[refCode].y;
    }

    let tipLengthBottom, tipOffset;
    tipLengthBottom = 500;  
    tipOffset = 500;
    // 작은 모듈에서 마커 값 겹침 문제 해결을 위해...
    // if (index % 2 === 0){ // 짝수 번째 모듈만 팁을 좀 크게 
    //   tipLengthBottom = 500;  
    //   tipOffset = 500;
    // } else { // 홀수 번째 모듈만 팁을 좀 작게
    //   tipLengthBottom = 470;  
    //   tipOffset = 470;
    // }

    // 파츠 객체 생성
    const mod = new CraneModule(
      part,
      prevPartsNextCoord,
      offSetX,
      offSetY,
      ctx,
      {
        tipLengthTop:30,
        tipLengthBottom, 
        tipOffset,
        markerPosition:'up'
      }
    );

    mod.calculateCoordination();
    prevPartsNextCoord.x = mod.next[0].x; // 다음 파츠 부착위치 저장
    prevPartsNextCoord.y = mod.next[0].y;
    
    if (part.code) { // 이 파츠를 참조하는 파츠가 있다면
      additionalParts = {
        ...additionalParts,
        [part.code]: {x: mod.next[1].x, y: mod.next[1].y, angle: mod.angle}
      };
    }

    // MarkerPoint 좌표 생성 및 마커 그리기
    switch (mod.partName) {
      case 'BODY': {
        markerRef = {
          ...markerRef,
          center: {
            x: mod.transCenter.x,
            y: mod.transCenter.y,
            // value: mod.angle
          },
        }
        console.log(markerRef);
        break;
      }
      case 'T': {
        markerRef = {
          ...markerRef,
          boomStart: {
            x: mod.pointInfo.start.x,
            y: mod.pointInfo.start.y,
            value: mod.angle
          },
          end: {
            x: mod.pointInfo.end.x,
            y: mod.pointInfo.end.y
          },
          boomAngle: {
            mainAngle: mod.pointInfo.mainAngle,
          },
          boomMarkerStart: { ...mod.pointInfo.markerStart },
          boomMarkerEnd: { ...mod.pointInfo.markerEnd }
        }
        // 마커 그리기
        // const points = [markerRef.center]
        // drawPoints(points, ctx);

        const mainBoomAngle = new AngleMarker(
          ctx,
          markerRef.boomStart,
          markerRef.boomAngle.mainAngle,
          markerRef.boomAngle.mainAngle,
          markerRef.boomAngle.mainAngle,
          200,
          {size: 40, color: 'black'},
          'boom'
        );
        mainBoomAngle.draw();

        let boomMarkerLine = new LineMarkerModule(
          ctx,
          {...markerRef.boomMarkerStart},
          {...markerRef.boomMarkerEnd},
          craneData.mainBoom, 30, 500, 30, 0, 1);
        boomMarkerLine.calculateGuidelinePosition().applyOffset(500, 'up2').draw(); //500
        break;
      }
      case 'F': {
        markerRef = {
          ...markerRef,
          fixStart: {
            x: mod.pointInfo.start.x,
            y: mod.pointInfo.start.y,
            //value: mod.angle
          },
          end: {
            x: mod.pointInfo.end.x,
            y: mod.pointInfo.end.y,
            //value: mod.angle
          },
          jibAngle: {
            mainAngle: mod.pointInfo.mainAngle,
            flyFixLuffingAngle: mod.pointInfo.flyFixLuffingAngle
          },
          fixMarkerStart: { ...mod.pointInfo.markerStart }
        }

        // 마커 그리기
        const flyFixLuffingAngle1 = new AngleMarker(
          ctx,
          markerRef.fixStart,
          markerRef.jibAngle.flyFixLuffingAngle,
          markerRef.jibAngle.mainAngle,
          markerRef.jibAngle.flyFixLuffingAngle,
          400,
          {size: 40, color: 'black'},
          'jib'
        );
        flyFixLuffingAngle1.draw();
        break;
      }
      case 'K': {
        markerRef = {
          ...markerRef,
          fixStart: {
            x: mod.pointInfo.start.x,
            y: mod.pointInfo.start.y,
            //value: mod.angle
          },
          end: {
            x: mod.pointInfo.end.x,
            y: mod.pointInfo.end.y,
            //value: mod.angle
          },
          jibAngle: {
            mainAngle: mod.pointInfo.mainAngle,
            flyFixLuffingAngle: mod.pointInfo.flyFixLuffingAngle
          },
          fixMarkerStart: { ...mod.pointInfo.markerStart },
          fixMarkerEnd: { ...mod.pointInfo.markerEnd }
        }
        // 마커 그리기
        const flyFixLuffingAngle1 = new AngleMarker(
          ctx,
          markerRef.fixStart,
          markerRef.jibAngle.flyFixLuffingAngle,
          markerRef.jibAngle.mainAngle,
          markerRef.jibAngle.flyFixLuffingAngle,
          400,
          {size: 40, color: 'black'},
          'jib'
        );
        flyFixLuffingAngle1.draw();
        let jibMarkerLine = new LineMarkerModule(
          ctx,
          {...markerRef.fixMarkerStart},
          {...markerRef.fixMarkerEnd},
          craneData.flyFixLuffing, 30, 500, 30, 0, 1);
        jibMarkerLine.calculateGuidelinePosition().applyOffset(500, 'up2').draw(); //150
        break;
      }
      case 'H': {
        markerRef = {
          ...markerRef,
          end: {
            x: mod.pointInfo.end.x,
            y: mod.pointInfo.end.y,
            //value: mod.angle
          },
          fixMarkerEnd: { ...mod.pointInfo.markerEnd }
        }
        //마커 그리기
        let jibMarkerLine = new LineMarkerModule(
          ctx,
          // {x: markerRef.fixStart.x, y: markerRef.fixStart.y},
          // {x: markerRef.end.x, y: markerRef.end.y},
          {...markerRef.fixMarkerStart},
          {...markerRef.fixMarkerEnd},
          craneData.flyFixLuffing, 30, 500, 30, 0, 1);
        jibMarkerLine.calculateGuidelinePosition().applyOffset(500, 'up2').draw();
        break;
      }
      default : {
      }
    }
    // wire 좌표 변환
    if (/^T/g.test(mod.partName)) part.name = 'T'; //붐이면 여러개의 part.name이 올수 있기때문에 T 1개로 변경
    //만약 와이어 값이 있다면
    if (mod.transWire[0] || mod.transWire[1] || mod.transWire[2] || mod.transWire[3]) {
      transParts[`${part.name}`] = mod.transWire; // 변환된(회전, 이동) wire 좌표를 파츠 네임에 맞춰 값을 저장
    }

    return mod;
  })// end map
  return {modParts, markerRef, transParts};
}

module.exports = getCraneCoordinate;