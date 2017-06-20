# Usage

```javascript
const redisClient = require('@dnode/redis')(process.env.REDIS_URL);

await redisClient.setJSON('key', 'value');
const value = await redisClient.getJSON('key');
```
