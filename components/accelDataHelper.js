
import math from 'mathjs'

export const roundUp = (n) => {
  if (!n) {
    return 0;
  }
  return Math.floor(n * 100);
}

export const returnAbs = (n) => {
  return {
    x: Math.abs(n.x),
    y: Math.abs(n.y),
    z: Math.abs(n.z),
  };
}

const returnDifferenceFromCalibrationPoint = (n, zeroPoint) => {
  const difference = n - zeroPoint;
  return Math.abs(difference);
}

// n is the current value, zero point is the calibration and totals is the running score
export const accummulateScore = (n, zeroPoint, totals) => {
  const accumulatedTotals = {
    x: 0,
    y: 0,
    z: 0,
  }
  // todo find a better way
  if (n.x > zeroPoint.x + 2 || n.x < zeroPoint.x - 2) {
    accumulatedTotals.x = totals.x + returnDifferenceFromCalibrationPoint(n.x, zeroPoint.x);
  } else {
    accumulatedTotals.x = totals.x;
  }
  if (n.y > zeroPoint.y + 2 || n.y < zeroPoint.y - 2) {
    accumulatedTotals.y = totals.y + returnDifferenceFromCalibrationPoint(n.y, zeroPoint.y);
  } else {
    accumulatedTotals.y = totals.y;
  }
  if (n.z > zeroPoint.z + 2 || n.z < zeroPoint.z - 2) {
    accumulatedTotals.z = totals.z + returnDifferenceFromCalibrationPoint(n.z, zeroPoint.z);
  } else {
    accumulatedTotals.z = totals.z;
  }
  return accumulatedTotals
}
