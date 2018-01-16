[![dependencies | 1 | 1](https://img.shields.io/badge/dependencies-1%20|%201-blue.svg)](DEPENDENCIES.md)

# Usage

```javascript
require('@dnode/ws-router-client')({
  controllers: {
    example: ({ body }) => {},
  },
  ws,
}).on('error', ({ e }) => {});
```
