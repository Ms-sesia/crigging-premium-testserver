function abbreviatePartName(partName) {
  if (/^T/g.test(partName)) return 'T'
  if (/^K/g.test(partName)) return 'K'
  if(/^F/g.test(partName)) return 'F'
  if(/head$/g.test(partName)) return 'H'
  return partName;
}
const getPoint = (point, ppm) => (distance) => {
  const distancePx = ppm * distance;
    return {
      x: point.x + distancePx,
      y: point.y
    }
  }
function drawPoints(points, ctx) {
  points.forEach(point => {
    ctx.beginPath();
    ctx.arc(point.x, point.y, 10, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'black';
    ctx.fill();
    // ctx.lineWidth = 20;
    ctx.strokeStyle = 'black';
    ctx.stroke();
  })
}
function getJibMod(craneCode) {
  if (/T$/g.test(craneCode)) return 'T'
  if (/F$/g.test(craneCode)) return 'F'
  if (/K$/g.test(craneCode)) return 'K'
  return ''
}
function getPixelPerMeter(partsData){
  // console.log(partsData);
  for (let key in partsData) {
    // 길이값이 있는 메인붐을 기준점으로 하기위해 붐 파츠를 찾는다

    if(partsData.hasOwnProperty(key) && partsData[key].type === 'boomParts') {
      const pattern = /_(\d{1,3}).*(\d)?/ // _100.3 와 같은 패턴
      let matchedArray = key.match(pattern)[0]; // 패턴과 매치 되는 값을 찾는다.
      let len = matchedArray.split('_')[1]; // _100.3 에서 _를 제거한다.
      let length_meter = parseFloat(len);
      const diffPx = partsData[key].joint[0].x - partsData[key].origin.x; // 시작 점과 끝점의 pixel 차이값
      return diffPx / length_meter;
    }
  }
}

module.exports = {
  abbreviatePartName,
  getPoint,
  drawPoints,
  getJibMod,
  getPixelPerMeter,
}