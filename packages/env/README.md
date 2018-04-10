[![dependencies | 3 | 3](https://img.shields.io/badge/dependencies-3%20|%203-blue.svg)](DEPENDENCIES.md)

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
