function drawWire(data, ctx) {
  data.forEach(points => {
    // console.log("points:",points);
    // if (points === undefined && points[0] === undefined) return;
    if (points) {
      ctx.moveTo(points[0]?.x,points[0]?.y);
      ctx.lineTo(points[1]?.x,points[1]?.y);
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.setTransform(1,0,0,1,0,0);
    } else {
      console.log("wireData",data)
      console.error("와이어 구성을 위한 파츠 정보와 현재 화면을 구성 파츠와 차이가 있습니다");
    }
  })
}

module.exports = drawWire;