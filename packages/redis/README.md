[![dependencies | 1 | 25](https://img.shields.io/badge/dependencies-1%20|%2025-blue.svg)](DEPENDENCIES.md)

# Usage

```javascript
const redis = require('@dnode/redis')(process.env.REDIS_URL);

(async () => {
  await redis.set('key', 'value', 1 * 60 * 60);
  const value = await redis.get('key');
})();
```

If the expire is an object supporting `asSeconds()` (e.g. [@dnode/duration](https://www.npmjs.com/package/@dnode/duration) or [moment.duration](http://momentjs.com/docs/#/durations/)) it will be used.

```javascript
const duration = require('@dnode/duration');
const redis = require('@dnode/redis')(process.env.REDIS_URL);

(async () => {
  await redis.set('key', 'value', duration('1h'));
  const value = await redis.get('key');
})();
```
