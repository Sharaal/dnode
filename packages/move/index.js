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
      arrive: true,
      distance: 0,
      move: false,
      steps: 0,
      x: 0,
      y: 0,
    };
  }

  const a = target.y - object.y;
  const b = target.x - object.x;

  const c = getC(a, b);

  if (object.speed === 0) {
    return {
      arrive: false,
      distance: c,
      move: false,
      steps: 0,
      x: 0,
      y: 0,
    };
  }

  if (c <= object.speed) {
    return {
      arrive: true,
      distance: c,
      move: true,
      steps: 1,
      x: b,
      y: a,
    };
  }

  const move = {
    distance: c,
    move: true,
    steps: Math.ceil(c / object.speed),
    x: getRound(getB(object.speed, getBeta(b, c))),
    y: getRound(getA(object.speed, getAlpha(a, c))),
  };
  move.arrive = isArrive(object, move, target);
  return move;
};
