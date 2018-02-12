[![dependencies | 1 | 1](https://img.shields.io/badge/dependencies-1%20|%201-blue.svg)](DEPENDENCIES.md)

# Usage

```javascript
const duration = require('@dnode/duration');

const milliseconds = duration('1h 20m').milliseconds();
```

## Input formats

* `ns`, `nanosecond`
* `microsecond`, `μs`
* `ms`, `millisecond`
* `s`, `sec`, `second`
* `m`, `min`, `minute`
* `h`, `hr`, `hour`
* `d`, `day`
* `w`, `wk`, `week`
* `month`
* `y`, `yr`, `year`

All formats also support the pluralizationed variants (e.g. `seconds`).

## Output format methods

* `.nanoseconds()`
* `.microseconds()`
* `.milliseconds()`
* `.seconds()`
* `.minutes()`
* `.hours()`
* `.days()`
* `.weeks()`
* `.months()`
* `.years()`
* `.toISOString()`

The output format methods are restricted to the pluralizationed variants to make the duration objects compatible to [moment.duration](http://momentjs.com/docs/#/durations/).
