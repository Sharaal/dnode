[![dependencies | 2 | 2](https://img.shields.io/badge/dependencies-2%20|%202-blue.svg)](DEPENDENCIES.md)

# Usage

```javascript
require('@dnode/env')();

require('@dnode/controllers')(
  app,
  [
    require('@dnode/env').controller(),
  ]
);
```
