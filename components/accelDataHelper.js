
import math from 'mathjs'

export const roundUp = (n) => {
  if (!n) {
    return 0;
  }
  return math.round(n, 2);
}

export const returnAbs = (n) => {
  if (n < 0) {
    return Math.abs(n);
  };
  return n;
}

export const accummulate = (n) => {

}
