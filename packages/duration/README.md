[![dependencies | 2 | 2](https://img.shields.io/badge/dependencies-2%20|%202-blue.svg)](DEPENDENCIES.md)

# Usage

```javascript
const duration = require('@dnode/duration');

const milliseconds = duration('1h 20m').asMilliseconds();
const seconds = duration('1h 20m').asSeconds();
```

## Input formats

Supported by [parse-duration](https://www.npmjs.com/package/parse-duration).

## Output format methods

Supported by [moment.duration](http://momentjs.com/docs/#/durations/).

# FAQ

## Why use it over `moment`?

`moment` split the number and the format in two parameters, e.g. `moment.duration(3, 'days')`. That is not really usable together with environment variables, e.g. `duration(process.env.DURATION || '3 days')`.
