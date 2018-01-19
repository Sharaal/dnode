[![dependencies | 1 | 25](https://img.shields.io/badge/dependencies-1%20|%2025-blue.svg)](DEPENDENCIES.md)

# Usage

```javascript
const redis = require('@dnode/redis')(process.env.REDIS_URL);

await redis.setJSON('key', 'value');
const value = await redis.getJSON('key');
```
