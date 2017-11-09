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
