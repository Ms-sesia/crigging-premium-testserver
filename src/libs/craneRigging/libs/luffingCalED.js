// mainToBlockEdgeDistance
export const luff_mTBlockED = (workValue, craneHeight, spec, index) => {
  const tmpBlockDist = (workValue.block.height1 - craneHeight) / Math.tan((spec.mainAngle * Math.PI) / 180);
  const dist = spec.distance[index] - (workValue.workBuilding.vertical + workValue.block.vertical1) - tmpBlockDist;
  return dist;
};

// flyFixLuffingToBlockEdgeDistance
export const luff_FFLBlockED = (workValue, params, craneHeight, spec) => {
  const tmpBlockDist =
    (workValue.block.height1 - params.h1 - craneHeight) / Math.tan((spec.flyFixLuffing * Math.PI) / 180);
  const dist = params.d2 - (workValue.workBuilding.vertical + workValue.block.vertical1) - tmpBlockDist;
  return dist;
};

// mainToBuildingEdgeDistance
export const luff_mTBuildingED = (workValue, craneHeight, spec, index) => {
  const tmpBuildingDist = (workValue.workBuilding.height - craneHeight) / Math.tan((spec.mainAngle * Math.PI) / 180);
  const dist = spec.distance[index] - workValue.workBuilding.vertical - tmpBuildingDist;
  return dist;
};

// flyFixLuffingBuildingEdgeDistance
export const luff_FFLBuildingED = (workValue, params, craneHeight, spec) => {
  const tmpBuildingDist =
    (workValue.workBuilding.height - params.h1 - craneHeight) / Math.tan((spec.flyFixLuffing * Math.PI) / 180);
  const dist = params.d2 - workValue.workBuilding.vertical - tmpBuildingDist;
  return dist;
};
