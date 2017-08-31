# Usage

## Get a single move of the object to the target 

```javascript
const getMove = require('@dnode/move.2d');

const object = { x: -1, y: 5, speed: 5 };
const target = { x: 10, y: -10 };

const move = getMove(object, target);
```

## Move the object till it arrives the target

```javascript
const getMove = require('@dnode/move.2d');

const object = { x: 10, y: -10, speed: 20 };
const target = { x: 800, y: 700 };

let move;
do {
  move = getMove(object, target);
  object.x += move.x;
  object.y += move.y;
} while(move.move && !move.arrive);
```
