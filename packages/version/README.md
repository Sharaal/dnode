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
