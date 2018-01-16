[![dependencies | 1 | 4](https://img.shields.io/badge/dependencies-1%20|%204-blue.svg)](DEPENDENCIES.md)

# Usage

```javascript
const redisClient = require('@dnode/redis')(process.env.REDIS_URL);

await redisClient.setJSON('key', 'value');
const value = await redisClient.getJSON('key');
```
