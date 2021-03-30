export const mTBlockED = async (workValue, craneHeight, spec, index) => {
  const tmpBlockDist = (workValue.block.height1 - craneHeight) / Math.tan((spec.mainAngle * Math.PI) / 180);
  const dist = spec.distance[index] - (workValue.workBuilding.vertical + workValue.block.vertical1) - tmpBlockDist;
  return dist;
};

export const FFLBlockED = async (workValue, params, craneHeight, spec) => {
  const tmpBlockDist =
    (workValue.block.height1 - params.h1 - craneHeight) / Math.tan((spec.luffingAngle * Math.PI) / 180);
  const dist = params.d2 - (workValue.workBuilding.vertical + workValue.block.vertical1) - tmpBlockDist;
  return dist;
};

export const mTBuildingED = async (workValue, craneHeight, spec, index) => {
  const tmpBuildingDist = (workValue.workBuilding.height - craneHeight) / Math.tan((spec.mainAngle * Math.PI) / 180);
  const dist = spec.distance[index] - workValue.workBuilding.vertical - tmpBuildingDist;
  return dist;
};

export const FFLBuildingED = async (workValue, params, craneHeight, spec) => {
  const tmpBuildingDist =
    (workValue.workBuilding.height - params.h1 - craneHeight) / Math.tan((spec.luffingAngle * Math.PI) / 180);
  const dist = params.d2 - workValue.workBuilding.vertical - tmpBuildingDist;
  return dist;
};
