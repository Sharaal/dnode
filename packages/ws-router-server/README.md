# Usage

```javascript
require('@dnode/ws-router-server')({
  controllers: {
    example: ({ body, user }) => {},
  },
  wss,
}).on('error', ({ e }) => {});
```
