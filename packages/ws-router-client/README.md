# Usage

```javascript
require('@dnode/ws-router-client')({
  controllers: {
    example: ({ body }) => {},
  },
  ws,
}).on('error', ({ e }) => {});
```
