function getC(a, b) {
  return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
}

function getBeta(b, c) {
  return Math.asin(b / c);
}

function getB(c, beta) {
  return c * Math.sin(beta);
}

function getAlpha(a, c) {
  return Math.asin(a / c);
}

function getA(c, alpha) {
  return c * Math.sin(alpha);
}

function round(number) {
  if (number < 0) {
    return Math.floor(number);
  }
  return Math.ceil(number);
}

module.exports = function getMove(object, target) {
  const a = target.y - object.y;
  const b = target.x - object.x;

  const c = getC(a, b);

  if (c <= object.speed) {
    return {
      x: b,
      y: a,
    };
  }

  return {
    x: round(getB(object.speed, getBeta(b, c))),
    y: round(getA(object.speed, getAlpha(a, c))),
  };
};
