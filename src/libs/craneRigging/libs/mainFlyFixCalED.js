// mainToBlockEdgeDistance
export const MFF_mTBlockED = (workValue, craneHeight, mainAngle, spec, index) => {
  const tmpBlockDist = (workValue.block.height1 - craneHeight) / Math.tan((mainAngle * Math.PI) / 180);
  const dist = spec.distance[index] - (workValue.workBuilding.vertical + workValue.block.vertical1) - tmpBlockDist;
  return dist;
};

// flyFixLuffingToBlockEdgeDistance
export const MFF_FFLBlockED = (workValue, params, craneHeight, mainAngle, spec) => {
  const tmpBlockDist =
    (workValue.block.height1 - params.h1 - craneHeight) / Math.tan((mainAngle - spec.flyFixAngle * Math.PI) / 180);
  const dist = params.d2 - (workValue.workBuilding.vertical + workValue.block.vertical1) - tmpBlockDist;
  return dist;
};

// mainToBuildingEdgeDistance
export const MFF_mTBuildingED = (workValue, craneHeight, mainAngle, spec, index) => {
  const tmpBuildingDist = (workValue.workBuilding.height - craneHeight) / Math.tan((mainAngle * Math.PI) / 180);
  const dist = spec.distance[index] - workValue.workBuilding.vertical - tmpBuildingDist;
  return dist;
};

// flyFixLuffingBuildingEdgeDistance
export const MFF_FFLBuildingED = (workValue, params, craneHeight, mainAngle, spec) => {
  const tmpBuildingDist =
    (workValue.workBuilding.height - params.h1 - craneHeight) /
    Math.tan((mainAngle - spec.flyFixAngle * Math.PI) / 180);
  const dist = params.d2 - workValue.workBuilding.vertical - tmpBuildingDist;
  return dist;
};

flyFixLuffingToBuildingEdgeDistance;
