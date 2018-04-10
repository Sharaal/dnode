[![dependencies | 0 | 0](https://img.shields.io/badge/dependencies-0%20|%200-green.svg)](DEPENDENCIES.md)

# Usage

```javascript
const cache = require('@dnode/cache')(client);

const value = await cache(
  'key',
  async () => 'value'
);
```

If the client supports `setJSON()` and `getJSON()` (e.g. [@dnode/redis](https://www.npmjs.com/package/@dnode/redis)) it
will be used to encode/decode the values.

```javascript
const cache = require('@dnode/cache')(client);

const value = await cache(
  'key',
  async () => ({ example: 'example' })
);
```

## Expire  

An expire (in seconds) can be passed to automatically remove the value from the cache after certain time.

```javascript
const cache = require('@dnode/cache')(client);

const value = await cache(
  'key',
  async () => 'value',
  1 * 60 * 60
);
```

If the expire is an object supporting `asSeconds()` (e.g. [@dnode/duration](https://www.npmjs.com/package/@dnode/duration) or [moment.duration](http://momentjs.com/docs/#/durations/)) it will be used.

```javascript
const cache = require('@dnode/cache')(client);
const duration = require('@dnode/duration');

const value = await cache(
  'key',
  async () => 'value',
  duration('1h')
);
```

## Invalidate  

The invalidate will be called after getting the value from the cache and can, if return true, force to get a new value.

```javascript
const cache = require('@dnode/cache')(client);

const value = await cache(
  'key',
  async () => 'value',
  { invalidate: value => value.invalid }
);
```

## Refresh

If `refresh` is `true`, the expire will always be refreshed if the key is available and the value is valid.

```javascript
const cache = require('@dnode/cache')(client);

const value = await cache(
  'key',
  async () => 'value',
  { refresh: true }
);
```
