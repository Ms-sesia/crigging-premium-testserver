const LineMarkerModule = require('./LineMarkerModule');

class AngleMarker extends LineMarkerModule{
  constructor(
    ctx,
    origin = {x:0,y:0},
    angleValue,
    mainAngle,
    flyFixLuffingAngle,
    radius,
    font,
    mod,
  ) {
    super();
    this.ctx = ctx;
    this.origin = origin;
    this.angleValue = flyFixLuffingAngle.toFixed(1);
    this.mainRadianAngle = mainAngle * (2 * Math.PI) / 360;
    this.fixLuffingRaianAngle = flyFixLuffingAngle * (2 * Math.PI) / 360;
    this.radius = radius;
    this.font = font;
    this.mod = mod;
  }

  calculateAngleLine() {

    const mainRadianAngle = this.mainRadianAngle;
    const fixLuffingRadianAngle = this.fixLuffingRaianAngle;
    const diffRadianAngle = mainRadianAngle - fixLuffingRadianAngle;

    const radius = this.radius;
    const {x,y} = this.origin;
    const rotate = this.rotate; // 상속받은 로테이션 메서드

    // const ONE_THIRD = (fixLuffingRadianAngle ? diffRadianAngle : mainRadianAngle) / 3;
    let ONE_THIRD;

    if (this.mod === 'jib') {
      ONE_THIRD = fixLuffingRadianAngle / 3;
    } else {
      ONE_THIRD = mainRadianAngle / 3;
    }
    const start1 = 2 * Math.PI - mainRadianAngle; // 첫번째 호의 시작
    const end1 = start1 + ONE_THIRD; // 첫번째 호의 끝
    const start2 = end1 + ONE_THIRD; // 두번째 호의 시작
    const end2 = start2 + ONE_THIRD; // 두번째 호의 끝

    let markerSize = (x+radius*(10/8)); // 마커 라인의 길이 (호의 반지름의 10/8)

    const mainLine = rotate(x, y, markerSize, y, mainRadianAngle); // boomAngle의 라인
    const diffLine = rotate(x, y, markerSize, y, diffRadianAngle); // diffAngle = boomAngle-fixAngle의 라인
    let value;
    if (this.mod === 'jib') {
      value = rotate(x,y, x+radius, y, diffRadianAngle + fixLuffingRadianAngle/2); // 값이 위치할 곳
    } else {
      value = rotate(x,y, x+radius, y, mainRadianAngle/2); // 값이 위치할 곳
    }

    return {
      arc1: {
        start: start1,
        end: end1
      },
      arc2: {
        start: start2,
        end: end2
      },
      line1:{
        start: {x,y},
        end: mainLine
      },
      line2: {
        start: {x,y},
        end: diffLine
      },
      value
    }
  }

  draw() {
    if (parseInt(this.angleValue) === 0) return;
    const { arc1, arc2, line1, line2, value } = this.calculateAngleLine();
    const x = this.origin.x;
    const y = this.origin.y;
    const radius = this.radius;
    const font = this.font;
    const angleValue = this.angleValue;
    const ctx = this.ctx;

    ctx.beginPath();
    ctx.arc(x, y, radius, arc1.start, arc1.end);
    ctx.linewidth = 2;
    ctx.strokeStyle = 'black'
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(x, y, radius, arc2.start, arc2.end);
    ctx.stroke();
    ctx.strokeStyle = 'black'

    ctx.beginPath();
    ctx.moveTo(line1.start.x,line1.start.y);
    ctx.lineTo(line1.end.x,line1.end.y);
    ctx.moveTo(line2.start.x,line2.start.y);
    ctx.lineTo(line2.end.x,line2.end.y);
    this.ctx.font = `normal ${font.size}px Arial`;
    this.ctx.fillStyle = font.color;
    this.ctx.fillText(`${angleValue}°`, value.x, value.y);
    ctx.stroke();
    ctx.setTransform(1,0,0,1,0,0);     // 컨텍스트 초기화
  }

}

module.exports = AngleMarker;