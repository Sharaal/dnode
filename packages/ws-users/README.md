[![dependencies | 1 | 1](https://img.shields.io/badge/dependencies-1%20|%201-blue.svg)](DEPENDENCIES.md)

# Usage

```javascript
const users = require('@dnode/ws-users')({ wss });
users.on('close', ({ user }) => {});
```
