[![dependencies | 0 | 0](https://img.shields.io/badge/dependencies-0%20|%200-green.svg)](DEPENDENCIES.md)

# Usage

```javascript
const wsMessage = require('@dnode/ws-message');

const message = wsMessage.stringify('example', { example: 'example' });
const [controller, body] = wsMessage.parse(message);
```
