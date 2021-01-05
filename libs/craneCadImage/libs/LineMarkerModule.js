class LineMarkerModule {
  constructor(
    ctx,
    start={x:0,y:0},
    end = {x:0,y:0},
    value= '0',
    tipLengthTop = 30,
    tipLengthBottom = 30,
    fontSize = 30,
    valueOffset = 0,
    lineWidth = 2,
  ) {
    this.ctx = ctx;
    this.start = start;
    this.end = end;
    this.value = value;
    this.tipLengthTop = tipLengthTop;
    this.tipLengthBottom = tipLengthBottom;
    this.fontSize = fontSize;
    this.valueOffset = valueOffset;
    this.rotateAngle =  Math.atan((start.y - end.y) / (end.x - start.x)); //라인의 각도
    this.lineData = {
      center: {x: 0, y: 0},
      lines: [
        {
          start: {x: 0, y: 0},
          end: {x: 0, y: 0},
        }, {
          start: {x: 0, y: 0},
          end: {x: 0, y: 0}
        }, {
          start: {x: 0, y: 0},
          end: {x: 0, y: 0}
        }, {
          start: {x: 0, y: 0},
          end: {x: 0, y: 0}
        }
      ],
    };
    this.lineWidth = lineWidth;
  }

  rotate(cx, cy, px, py, rad) {
    const rx = (px - cx) * Math.cos(rad) + (py - cy) * Math.sin(rad) + cx;
    const ry = -(px - cx) * Math.sin(rad) + (py - cy) * Math.cos(rad) + cy;
    return {x: rx, y: ry}
  }

  calculateGuidelinePosition() {
    const sx = this.start.x;
    const sy = this.start.y;
    const ex = this.end.x;
    const ey = this.end.y;
    const tipLengthTop = this.tipLengthTop;
    const tipLengthBottom = this.tipLengthBottom;
    const rotateAngle = this.rotateAngle;
    // 1. 각도 구하기 (sx, sy, ex, ey)
    // const rotateAngle = Math.atan((sy - ey) / (ex - sx)); //return in radians of a number

    // 각도 만큼 팁 회전
    const nextS1 = this.rotate(sx, sy, sx, sy - tipLengthTop, rotateAngle); //시작지점 팁1
    const nextS2 = this.rotate(sx, sy, sx, sy + tipLengthBottom, rotateAngle); //시작지점 팁2
    const nextE1 = this.rotate(ex, ey, ex, ey - tipLengthTop, rotateAngle); //끝지점  팁1
    const nextE2 = this.rotate(ex, ey, ex, ey + tipLengthBottom, rotateAngle); //끝지점 팁2

    function getCenter(sx, sy, ex, ey) {
      return {
        x: ((ex - sx) / 2 + sx),
        y: ((ey - sy) / 2 + sy)
      }
    }

    const start = {x: sx, y: sy};
    const end = {x: ex, y: ey};
    const center = getCenter(sx, sy, ex, ey);
    const centerHalf1 = getCenter(sx, sy, center.x, center.y);
    const centerHalf2 = getCenter(center.x, center.y, ex, ey);

    this.lineData = {
      center,
      lines: [
        {
          start: nextS1,
          end: nextS2,
        }, {
          start: start,
          end: centerHalf1
        }, {
          start: nextE1,
          end: nextE2
        }, {
          start: end,
          end: centerHalf2
        }
      ],
    }
    return this;

  }

  applyOffset(offset, position) {
    const lineData = this.lineData;
    const rotateAngle = this.rotateAngle;
    const rotate = this.rotate;
    switch (position) {
      case 'up2': {
        // rotational error compensation
        const rec = rotate(0, 0, 0, offset,rotateAngle);

        lineData.center.y -= rec.y;
        lineData.center.x -= rec.x;
        for (let i = 0; i < lineData.lines.length; i++) {
          // lineData.lines[i].start.y -= offset;
          lineData.lines[i].start.y -= rec.y;
          lineData.lines[i].start.x -= rec.x;
          lineData.lines[i].end.y -= rec.y;
          lineData.lines[i].end.x -= rec.x;
        }
        break;
      }
      case 'down2': {
        // rotational error compensation
        const rec = rotate(0, 0, 0, offset,rotateAngle);

        lineData.center.y += rec.y;
        lineData.center.x += rec.x;
        for (let i = 0; i < lineData.lines.length; i++) {
          // lineData.lines[i].start.y -= offset;
          lineData.lines[i].start.y += rec.y;
          lineData.lines[i].start.x += rec.x;
          lineData.lines[i].end.y += rec.y;
          lineData.lines[i].end.x += rec.x;
        }
        break;
      }
      case 'up': {
        lineData.center.y -= offset;

        for (let i = 0; i < lineData.lines.length; i++) {
          lineData.lines[i].start.y -= offset;
          lineData.lines[i].end.y -= offset;
        }
        break;
      }
      case 'down': {
        lineData.center.y += offset;
        for (let i = 0; i < lineData.lines.length; i++) {
          lineData.lines[i].start.y += offset;
          lineData.lines[i].end.y += offset;
        }
        break;
      }
      case 'left': {
        lineData.center.x -= offset;
        for (let i = 0; i < lineData.lines.length; i++) {
          lineData.lines[i].start.x -= offset;
          lineData.lines[i].end.x -= offset;
        }
        break;
      }
      case 'right': {
        lineData.center.x += offset;
        for (let i = 0; i < lineData.lines.length; i++) {
          lineData.lines[i].start.x += offset;
          lineData.lines[i].end.x += offset;
        }
        break;
      }
      default : {
      }
    }
    return this;
  }

  draw(ctx = this.ctx) {
    if(this.value) {
      const length = this.value.toFixed(1);
      const lineData = this.lineData;
      const fontSize = this.fontSize;

      ctx.beginPath();
      ctx.font = `normal ${fontSize}pt Arial`;
      ctx.fillStyle = 'black';
      ctx.textAlign = "center";
      // ctx.textBaseline = "middle";
      ctx.lineWidth = this.lineWidth;
      if (this.valueOffset) {
        ctx.translate(lineData.center.x, lineData.center.y);
        ctx.rotate(-this.rotateAngle);
        ctx.textAline= "center";
        ctx.fillText(`${length}m`, 0, this.valueOffset);
        ctx.setTransform(1, 0, 0, 1, 0, 0);     // 컨텍스트 초기화
      }
      else if (length > 4 ){
        ctx.translate(lineData.center.x, lineData.center.y);
        ctx.rotate(-this.rotateAngle);
        ctx.textAline= "center";
        ctx.fillText(`${length}m`,0,0);
        ctx.setTransform(1, 0, 0, 1, 0, 0);     // 컨텍스트 초기화
      } else if (length >= 2){
        ctx.font = `normal ${22}pt Arial`;
        ctx.textAline= "center";
        ctx.translate(lineData.center.x, lineData.center.y);
        ctx.rotate(-this.rotateAngle);
        ctx.fillText(`${length}m`,0,0);
        ctx.setTransform(1, 0, 0, 1, 0, 0);     // 컨텍스트 초기화
      } else {
        ctx.font = `normal ${19}pt Arial`;
        ctx.translate(lineData.center.x, lineData.center.y);
        ctx.rotate(-this.rotateAngle);
        ctx.textAline= "center";
        ctx.fillText(`${length}m`, 0, -50); //30정도 위에 표시 되기 위해서
        ctx.setTransform(1, 0, 0, 1, 0, 0);     // 컨텍스트 초기화
      }

      lineData.lines.forEach((line, index) => {
        if(length < 4){ // 만약에 마커길이가 4보다 작으면 마커 팁이 안나오도록 설정
          if(index === 1 || index === 3) { //index 1,3 마커의 안쪽 가로선 2개를 그리지 않는다
            return;
          }
      }
        ctx.moveTo(line.start.x, line.start.y);
        ctx.lineTo(line.end.x, line.end.y);
      })
      ctx.strokeStyle = 'black';
      ctx.stroke();
    }
    ctx.setTransform(1, 0, 0, 1, 0, 0);     // 컨텍스트 초기화
  }
}

module.exports = LineMarkerModule;