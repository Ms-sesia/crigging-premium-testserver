// canvas에 draw된 이미지를 파일로 저장
function saveImage(_canvas) {
  return new Promise( (resolve, reject) => {
    const out = fs.createWriteStream(__dirname + '/test.png')
    const stream = _canvas.createPNGStream()
    stream.pipe(out)
    out.on('finish', () =>  console.log('The JPEG file was created.'))
    resolve();
  })
}

module.exports = saveImage;