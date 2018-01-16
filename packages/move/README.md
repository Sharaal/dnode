[![dependencies | 0 | 0](https://img.shields.io/badge/dependencies-0%20|%200-green.svg)](DEPENDENCIES.md)

# Usage

## Get a single move of the object to the target 

```javascript
const getMove = require('@dnode/move.2d');

const objectPosition = { x: -1, y: 5 };
const objectSpeed = 5;
const targetPosition = { x: 10, y: -10 };

const move = getMove(objectPosition, objectSpeed, targetPosition);
```

## Move the object till it arrives the target

```javascript
const getMove = require('@dnode/move.2d');

const objectPosition = { x: 10, y: -10 };
const objectSpeed = 20;
const targetPosition = { x: 800, y: 700 };

let move;
do {
  move = getMove(objectPosition, objectSpeed, targetPosition);
  objectPosition.x += move.x;
  objectPosition.y += move.y;
} while (move.move && !move.arrive);
```
