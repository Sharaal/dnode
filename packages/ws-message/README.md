# Usage

```javascript
const wsMessage = require('@dnode/ws-message');

const message = wsMessage.stringify('example', { example: 'example' });
const [controller, body] = wsMessage.parse(message);
```
