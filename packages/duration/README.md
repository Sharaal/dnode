[![dependencies | 1 | 1](https://img.shields.io/badge/dependencies-1%20|%201-blue.svg)](DEPENDENCIES.md)

# Usage

```javascript
const duration = require('@dnode/duration');

const milliseconds = duration('1h 20m').milliseconds();
```

## Formats

* ns, nanosecond, nanoseconds
* microsecond, 'μs', microseconds
* ms, millisecond, milliseconds
* s, sec, second, seconds
* m, min, minute, minutes
* h, hr, hour, hours
* d, day, days
* w, wk, week, weeks
* month, months
* y, yr, year, years
* iso8601
