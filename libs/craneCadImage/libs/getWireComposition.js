function wirePoints(wireComposition, wireData) {
  // 11200의 특수 상황 해결을 위한 코드
  // 1m_NM_head가 있고 3.8m_NI_head 가 없다면 F9m_nsbs에 1m_NM_head를 연결
  let isExist_1m_NM_head = false;
  let isExist_38m_NI_head = false;
  let isExist_1m_NM_h = false;

  for(let parts in wireData) {
    if(parts === "1m_NM_head") isExist_1m_NM_head = true;
    else if(parts === "3.8m_NI_head") isExist_38m_NI_head = true;
    else if(parts === "1m_NM_h") isExist_1m_NM_h = true;
  }
  // 1m만 존재한다면
  if (isExist_1m_NM_head && !isExist_38m_NI_head) {
    // F9m_nsbs에 1m_NM_head를 연결 (3.8m_NI_head연결 삭제)
    wireComposition.forEach((wire, index) => {
      const case1 = {
        from: {name: 'F9m_nsbs', number: 1},
        to: {name: '3.8m_NI_head', number: 0}
      }
      // case1에 해당하는 객체를 삭제한다
      if (case1.from.name === wire.from.name &&
        case1.from.number === wire.from.number &&
        case1.to.name === wire.to.name &&
        case1.to.number === wire.to.number) {
        wireComposition.slice(index, 1);
      }
    })
  }
  // 둘다 존재한다면
  else if (isExist_1m_NM_h && isExist_38m_NI_head) {
    // 둘다 존재한다면
    // F9m_nsbs를 3.8m_NI_head에 연결
    wireComposition.forEach((wire, index) => {
        const case2 = {
          from: {name: 'F9m_nsbs', number: 1},
          to: {name: '1m_NM_h', number: 0}
        };
        if (case2.from.name === wire.from.name &&
          case2.from.number === wire.from.number &&
          case2.to.name === wire.to.name &&
          case2.to.number === wire.to.number) {
          wireComposition.slice(index, 1);
        }
      })
  }
  return wireComposition.map(arr => {
    // console.log("wireCompositionArray",arr);
    if(wireData[arr.from.name] && wireData[arr.to.name] ) {
      const from = wireData[arr.from.name][arr.from.number];
      const to = wireData[arr.to.name][arr.to.number];
      // 시작점과 끝점의 조표를 리턴한다
      return [from, to]
    }
  })
}

module.exports = {
  wirePoints,
}

