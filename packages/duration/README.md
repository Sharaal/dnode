[![dependencies | 1 | 1](https://img.shields.io/badge/dependencies-1%20|%201-blue.svg)](DEPENDENCIES.md)

# Usage

```javascript
const duration = require('@dnode/duration');

const milliseconds = duration('1h 20m').asMilliseconds();
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

* `.asMilliseconds()`
* `.asSeconds()`
* `.asMinutes()`
* `.asHours()`
* `.asDays()`
* `.asWeeks()`
* `.asMonths()`
* `.asYears()`
* `.toISOString()`

The output format methods are compatible to [moment.duration](http://momentjs.com/docs/#/durations/).
