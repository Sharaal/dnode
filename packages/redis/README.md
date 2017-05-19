# Usage

```javascript
const redisClient = require('@dnode/redis')('redisURL');

await redisClient.setJSON('key', 'value');
const value = await redisClient.getJSON('key');
```
