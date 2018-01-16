[![dependencies | 0 | 0](https://img.shields.io/badge/dependencies-0%20|%200-green.svg)](DEPENDENCIES.md)

# Usage

```javascript
const cache = require('@dnode/cache')(client);
const value = await cache(
  'key',
  () => {
    return 'value';
  }
);
```
