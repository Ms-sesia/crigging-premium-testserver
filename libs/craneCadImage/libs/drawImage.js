// 크레인 이미지 canvas에 드로우
function drawImage(modParts, buildParts) {
  return new Promise( async (resolve, reject) => {
    let tempModParts = [...modParts]; // 정렬을 위하 임시저장
    let tempBuildParts = [...buildParts];
    tempModParts.sort((a, b) => a.drawOrder - b.drawOrder);
    // 이부분이 await 이 필요하다. 루프라서 await이 안된다.
    // 건물 그리기
    for ( let i = 0 ; i < tempBuildParts.length ; i++) {
      await tempBuildParts[i]?.draw();
    }
    // 크레인 파츠 그리기
    for ( let i = 0 ; i < tempModParts.length ; i++) {
      await tempModParts[i]?.draw();
    }
    
    
    resolve();
  })
}

module.exports = drawImage;