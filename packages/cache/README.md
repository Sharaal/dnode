# Usage

```javascript
const cache = require('@dnode/cache')(client);
cache(
  'key',
  callback => {
    callback('value');
  },
  value => {}
);
```
