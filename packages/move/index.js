function isArrived(objectPosition, targetPosition) {
  return objectPosition.x === targetPosition.x && objectPosition.y === targetPosition.y;
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

function isArrive(objectPosition, move, targetPosition) {
  return isArrived({ x: objectPosition.x + move.x, y: objectPosition.y + move.y }, targetPosition);
}

module.exports = function getMove(objectPosition, objectSpeed, targetPosition) {
  if (isArrived(objectPosition, targetPosition)) {
    return {
      arrive: true,
      distance: 0,
      move: false,
      steps: 0,
      x: 0,
      y: 0,
    };
  }

  const a = targetPosition.y - objectPosition.y;
  const b = targetPosition.x - objectPosition.x;

  const c = getC(a, b);

  if (objectSpeed === 0) {
    return {
      arrive: false,
      distance: c,
      move: false,
      steps: 0,
      x: 0,
      y: 0,
    };
  }

  if (c <= objectSpeed) {
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
    steps: Math.ceil(c / objectSpeed),
    x: getRound(getB(objectSpeed, getBeta(b, c))),
    y: getRound(getA(objectSpeed, getAlpha(a, c))),
  };
  move.arrive = isArrive(objectPosition, move, targetPosition);
  return move;
};
