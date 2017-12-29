
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

export const accummulateScore = (n, zeroPoint, totals) => {
  const accumulatedTotals = {
    x: 0,
    y: 0,
    z: 0,
  }
  // todo find a better way
  if (n.x > zeroPoint.x + 5) {
    accumulatedTotals.x = totals.x + n.x;
  } else {
    accumulatedTotals.x = totals.x;
  }
  if (n.y > zeroPoint.y + 5) {
    accumulatedTotals.y = totals.y + n.y;
  } else {
    accumulatedTotals.y = totals.y;
  }
  if (n.z > zeroPoint.z + 5) {
    accumulatedTotals.z = totals.z + n.z;
  } else {
    accumulatedTotals.z = totals.z;
  }
  return accumulatedTotals
}
