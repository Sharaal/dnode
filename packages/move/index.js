function isArrived(object, target) {
  return object.x === target.x && object.y === target.y;
}

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

function getRound(number) {
  if (number < 0) {
    return Math.floor(number);
  }
  return Math.ceil(number);
}

function isArrive(object, move, target) {
  return isArrived({ x: object.x + move.x, y: object.y + move.y }, target);
}

module.exports = function getMove(object, target) {
  if (isArrived(object, target)) {
    return {
      x: 0,
      y: 0,
      move: false,
      arrive: true,
    };
  }

  if (object.speed === 0) {
    return {
      x: 0,
      y: 0,
      move: false,
      arrive: false,
    };
  }

  const a = target.y - object.y;
  const b = target.x - object.x;

  const c = getC(a, b);

  if (c <= object.speed) {
    return {
      x: b,
      y: a,
      move: true,
      arrive: true,
    };
  }

  const move = {
    x: getRound(getB(object.speed, getBeta(b, c))),
    y: getRound(getA(object.speed, getAlpha(a, c))),
    move: true,
  };
  move.arrive = isArrive(object, move, target);
  return move;
};
