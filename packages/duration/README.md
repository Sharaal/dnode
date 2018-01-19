[![dependencies | 1 | 1](https://img.shields.io/badge/dependencies-1%20|%201-blue.svg)](DEPENDENCIES.md)

# Usage

```javascript
const duration = require('@dnode/duration');

const millisecond = duration('1h 20m').millisecond();
```

## Formats

* ns, nanosecond
* microsecond, 'μs'
* ms, millisecond
* s, sec, second
* m, min, minute
* h, hr, hour
* d, day
* w, wk, week
* month
* y, yr, year
* iso8601
