[![dependencies | 0 | 0](https://img.shields.io/badge/dependencies-0%20|%200-green.svg)](DEPENDENCIES.md)

# Usage

```javascript
const version = require('@dnode/version')();

require('@dnode/controllers')(
  app,
  [
    require('@dnode/version').controller(),
  ]
);
```
