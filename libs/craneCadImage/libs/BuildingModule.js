class BuildingModule{
  constructor(offSetX, offSetY, width, height, type, ctx, ppm, centerX,distance, markPosition=[], markOffset= 0, fontSize= 30) {
    this.offSetX = offSetX;
    this.offSetY = offSetY;
    this.width = ppm * width;
    this.height = ppm * height;
    this.type = type;
    this.ctx = ctx;
    this.ppm = ppm;
    this.centerX = centerX;
    this.distance = ppm * distance;
    this.markPosition = markPosition;
    this.color = 'grey';
    this.markOffset = markOffset;
    this.fontSize = fontSize;
    this.initialSetup(type);
  }
  initialSetup(type) {
    switch(type) {
      case 'Building': {
        this.color = '#d9dbdb';
        this.lineColor = 'black';
        break;
      }
      case 'Block': {
        this.color = '#e9ebdb';
        this.lineColor = 'black';
        break;
      }
      case 'Empty': {
        this.color = 'transparent';
        this.lineColor = 'transparent';
        // this.globalAlpha = 0.5;
        break;
      }
      default : {
        this.color = 'blue';
      }
    }
  }

  calculateCoordinate() {
    let x = this.centerX + this.distance;
    let y = this.offSetY  - this.height;
    const width = this.width;
    const height = this.height;
    this.ref1 = { //가이드 라인을 위한 기준좌표
      x: x,
      y: y
    };
    this.ref2 = {
      x: x + width,
      y: y,
    };
    this.ref3 = { //가이드 라인을 위한 기준좌표
      x: x,
      y: y + height
    };
    this.ref4 = {
      x: x + width,
      y: y + height
    };
    return {
      x,y,width,height
    }
  }

  draw() {
      const {x,y,width,height} = this.calculateCoordinate();

      this.drawGuideLine(this.markPosition, 'black');
      this.drawBox(x,y, width, height, this.color, this.lineColor);
  }

  drawBox(x,y,width,height, color, lineColor) {
    this.ctx.beginPath();
    this.ctx.rect(x,y, width, height);
    this.ctx.fillStyle = color;//'#d9dbdb';
    this.ctx.fill();

    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = lineColor;
    this.ctx.stroke();
    this.ctx.setTransform(1,0,0,1,0,0);     // 컨텍스트 초기화
  }

  drawGuideLine(markPosition, textColor) {
    this.markOffset = 0;
    const spaceOffsetY = 20 + this.markOffset;
    const spaceOffsetX = 20 + this.markOffset;
    const rowLineOffsetY = 30;
    const rowLineOffsetX = this.width/6;
    const columnLineOffsetY = this.height/6;
    const columnLineOffsetX = 30;
    // Text
    const textOffsetRight = 80 + this.markOffset;
    const textOffsetBottom = 70 + this.markOffset;
    const textOffsetLeft = 160 + this.markOffset;
    const textOffsetTop = 50 + this.markOffset;
    const correctPosition = 40; // 폭을 나타내는 글자가 중간에서 시작하지 않기때문에 보정해줌
    const fontSize = this.fontSize;

    const heightRight = { // 높이 값이 위치 해야하는 좌표(x,y)
      x: this.ref2.x + textOffsetRight,
      y: ((this.ref2.y - this.ref4.y)/2  + this.ref4.y),
    };
    const widthBottom = {
      x: ((this.ref4.x - this.ref3.x)/2 + this.ref3.x)  ,
      y:this.ref4.y + textOffsetBottom
    };
    const heightLeft = {
      x: this.ref1.x - textOffsetLeft,
      y: ((this.ref1.y - this.ref3.y)/2  + this.ref3.y),
    };
    const widthTop = {
      x: ((this.ref2.x - this.ref1.x)/2 + this.ref1.x - correctPosition),
      y:this.ref1.y - textOffsetTop
    };

    const gBottom1 = {
      x: this.ref3.x,
      y: this.ref3.y + spaceOffsetY
    };
    const gBottom2 = {
      x: this.ref3.x,
      y: this.ref3.y + spaceOffsetY + rowLineOffsetY
    };
    const gBottom3 = {
      x: this.ref3.x,
      y: this.ref3.y + spaceOffsetY + rowLineOffsetY/2
    };
    const gBottom4 = {
      x: this.ref3.x + rowLineOffsetX,
      y: this.ref3.y + spaceOffsetY + rowLineOffsetY/2
    };
    const gBottom5 = {
      x: this.ref4.x,
      y: this.ref4.y + spaceOffsetY
    };
    const gBottom6 = {
      x: this.ref4.x,
      y: this.ref4.y + spaceOffsetY + rowLineOffsetY
    };
    const gBottom7 = {
      x: this.ref4.x,
      y: this.ref4.y + spaceOffsetY + rowLineOffsetY/2
    };
    const gBottom8 = {
      x: this.ref4.x - rowLineOffsetX,
      y: this.ref4.y + spaceOffsetY + rowLineOffsetY/2
    };

    const gTop1 = {
      x: this.ref1.x,
      y: this.ref1.y - spaceOffsetY
    };
    const gTop2 = {
      x: this.ref1.x,
      y: this.ref1.y - spaceOffsetY - rowLineOffsetY
    };
    const gTop3 = {
      x: this.ref1.x,
      y: this.ref1.y - spaceOffsetY - rowLineOffsetY/2
    };
    const gTop4 = {
      x: this.ref1.x + rowLineOffsetX,
      y: this.ref1.y - spaceOffsetY - rowLineOffsetY/2
    };
    const gTop5 = {
      x: this.ref2.x,
      y: this.ref2.y - spaceOffsetY
    };
    const gTop6 = {
      x: this.ref2.x,
      y: this.ref2.y - spaceOffsetY - rowLineOffsetY
    };
    const gTop7 = {
      x: this.ref2.x,
      y: this.ref2.y - spaceOffsetY - rowLineOffsetY/2
    };
    const gTop8 = {
      x: this.ref2.x - rowLineOffsetX,
      y: this.ref2.y - spaceOffsetY - rowLineOffsetY/2
    };
    
    const gRight9 = {
      x: this.ref2.x + spaceOffsetX,
      y: this.ref2.y
    };
    const gRight10 = {
      x: this.ref2.x + spaceOffsetX + columnLineOffsetX,
      y: this.ref2.y
    };
    const gRight11 = {
      x: this.ref2.x + spaceOffsetX + columnLineOffsetX/2,
      y: this.ref1.y
    };
    const gRight12 = {
      x: this.ref2.x + spaceOffsetX + columnLineOffsetX/2,
      y: this.ref2.y + spaceOffsetY + columnLineOffsetY
    };
    const gRight13 = {
      x: this.ref4.x + spaceOffsetX,
      y: this.ref4.y
    };
    const gRight14 = {
      x: this.ref4.x + spaceOffsetX + columnLineOffsetX,
      y: this.ref4.y
    };
    const gRight15 = {
      x: this.ref4.x + spaceOffsetX + columnLineOffsetX/2,
      y: this.ref4.y
    };
    const gRight16 = {
      x: this.ref4.x + spaceOffsetX + columnLineOffsetX/2,
      y: this.ref4.y - columnLineOffsetY
    };

    const gLeft9 = {
      x: this.ref1.x - spaceOffsetX,
      y: this.ref1.y
    };
    const gLeft10 = {
      x: this.ref1.x - spaceOffsetX - columnLineOffsetX,
      y: this.ref1.y
    };
    const gLeft11 = {
      x: this.ref1.x - spaceOffsetX - columnLineOffsetX/2,
      y: this.ref1.y
    };
    const gLeft12 = {
      x: this.ref1.x - spaceOffsetX - columnLineOffsetX/2,
      y: this.ref1.y + spaceOffsetY + columnLineOffsetY
    };
    const gLeft13 = {
      x: this.ref3.x - spaceOffsetX,
      y: this.ref3.y
    };
    const gLeft14 = {
      x: this.ref3.x - spaceOffsetX - columnLineOffsetX,
      y: this.ref3.y
    };
    const gLeft15 = {
      x: this.ref3.x - spaceOffsetX - columnLineOffsetX/2,
      y: this.ref3.y
    };
    const gLeft16 = {
      x: this.ref3.x - spaceOffsetX - columnLineOffsetX/2,
      y: this.ref3.y - columnLineOffsetY
    };
    
    this.ctx.beginPath();
    this.ctx.strokeStyle = 'black';
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";

    //Bottom
    if (markPosition.find(v => v === 'bottom')){
      this.ctx.moveTo(gBottom1.x,gBottom1.y);
      this.ctx.lineTo(gBottom2.x,gBottom2.y);
      this.ctx.moveTo(gBottom1.x,gBottom1.y);
      this.ctx.lineTo(gBottom3.x,gBottom3.y);
      this.ctx.moveTo(gBottom3.x,gBottom3.y);
      this.ctx.lineTo(gBottom4.x,gBottom4.y);

      this.ctx.moveTo(gBottom5.x,gBottom5.y);
      this.ctx.lineTo(gBottom6.x,gBottom6.y);
      this.ctx.moveTo(gBottom5.x,gBottom5.y);
      this.ctx.lineTo(gBottom7.x,gBottom7.y);
      this.ctx.moveTo(gBottom7.x,gBottom7.y);
      this.ctx.lineTo(gBottom8.x,gBottom8.y);

      this.ctx.font = `normal ${fontSize}pt Arial`;
      this.ctx.fillStyle = textColor;
      this.ctx.fillText(`${(this.width/this.ppm).toFixed(1)}m`, widthBottom.x,widthBottom.y);
    }

    if (markPosition.find(v => v === 'top')) {
      this.ctx.moveTo(gTop1.x, gTop1.y);
      this.ctx.lineTo(gTop2.x, gTop2.y);
      this.ctx.moveTo(gTop1.x, gTop1.y);
      this.ctx.lineTo(gTop3.x, gTop3.y);
      this.ctx.moveTo(gTop3.x, gTop3.y);
      this.ctx.lineTo(gTop4.x, gTop4.y);

      this.ctx.moveTo(gTop5.x, gTop5.y);
      this.ctx.lineTo(gTop6.x, gTop6.y);
      this.ctx.moveTo(gTop5.x, gTop5.y);
      this.ctx.lineTo(gTop7.x, gTop7.y);
      this.ctx.moveTo(gTop7.x, gTop7.y);
      this.ctx.lineTo(gTop8.x, gTop8.y);

      this.ctx.font = `normal ${fontSize}pt Arial`;
      this.ctx.fillStyle = textColor;
      this.ctx.fillText(`${(this.width/this.ppm).toFixed(1)}m`, widthTop.x,widthTop.y);

    }
    if (markPosition.find(v => v === 'right')) {
      this.ctx.moveTo(gRight9.x, gRight9.y);
      this.ctx.lineTo(gRight10.x, gRight10.y);
      this.ctx.moveTo(gRight9.x, gRight9.y);
      this.ctx.lineTo(gRight11.x, gRight11.y);
      this.ctx.moveTo(gRight11.x, gRight11.y);
      this.ctx.lineTo(gRight12.x, gRight12.y);

      this.ctx.moveTo(gRight13.x, gRight13.y);
      this.ctx.lineTo(gRight14.x, gRight14.y);
      this.ctx.moveTo(gRight13.x, gRight13.y);
      this.ctx.lineTo(gRight15.x, gRight15.y);
      this.ctx.moveTo(gRight15.x, gRight15.y);
      this.ctx.lineTo(gRight16.x, gRight16.y);
      //Text
      this.ctx.font = `normal ${fontSize}pt Arial`;
      this.ctx.fillStyle = textColor;
      this.ctx.fillText(`${(this.height/this.ppm).toFixed(1)}m`, heightRight.x,heightRight.y);
    }
    if (markPosition.find(v => v === 'left')) {
      this.ctx.moveTo(gLeft9.x, gLeft9.y);
      this.ctx.lineTo(gLeft10.x, gLeft10.y);
      this.ctx.moveTo(gLeft9.x, gLeft9.y);
      this.ctx.lineTo(gLeft11.x, gLeft11.y);
      this.ctx.moveTo(gLeft11.x, gLeft11.y);
      this.ctx.lineTo(gLeft12.x, gLeft12.y);

      this.ctx.moveTo(gLeft13.x, gLeft13.y);
      this.ctx.lineTo(gLeft14.x, gLeft14.y);
      this.ctx.moveTo(gLeft13.x, gLeft13.y);
      this.ctx.lineTo(gLeft15.x, gLeft15.y);
      this.ctx.moveTo(gLeft15.x, gLeft15.y);
      this.ctx.lineTo(gLeft16.x, gLeft16.y);

      this.ctx.font = `normal ${fontSize}pt Arial`;
      this.ctx.fillStyle = textColor;
      this.ctx.fillText(`${(this.height/this.ppm).toFixed(1)}m`, heightLeft.x,heightLeft.y);

    }


    this.ctx.stroke();
    this.ctx.setTransform(1,0,0,1,0,0);     // 컨텍스트 초기화
  }
}

module.exports = BuildingModule;