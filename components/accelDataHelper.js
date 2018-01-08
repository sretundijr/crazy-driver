
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
  const sensitivity = 5;
  const accumulatedTotals = {
    x: 0,
    y: 0,
    z: 0,
  }
  // todo find a better way
  if (n.x > zeroPoint.x + sensitivity || n.x < zeroPoint.x - sensitivity) {
    accumulatedTotals.x = totals.x + returnDifferenceFromCalibrationPoint(n.x, zeroPoint.x);
  } else {
    accumulatedTotals.x = totals.x;
  }
  if (n.y > zeroPoint.y + sensitivity || n.y < zeroPoint.y - sensitivity) {
    accumulatedTotals.y = totals.y + returnDifferenceFromCalibrationPoint(n.y, zeroPoint.y);
  } else {
    accumulatedTotals.y = totals.y;
  }
  if (n.z > zeroPoint.z + sensitivity || n.z < zeroPoint.z - sensitivity) {
    accumulatedTotals.z = totals.z + returnDifferenceFromCalibrationPoint(n.z, zeroPoint.z);
  } else {
    accumulatedTotals.z = totals.z;
  }
  return accumulatedTotals
}

export const adjustScoreByTime = (total, time) => {
  return Math.round(total / time);
}
