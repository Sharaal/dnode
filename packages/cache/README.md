[![dependencies | 0 | 0](https://img.shields.io/badge/dependencies-0%20|%200-green.svg)](DEPENDENCIES.md)

# Usage

Decorate a client (e.g. [redis](https://www.npmjs.com/package/@dnode/redis)) with caching. 

```javascript
const cache = require('@dnode/cache')(client);

const value = await cache(
  'key',
  async () => {
    return 'value';
  }
);
```

If the client supports `setJSON()` and `getJSON()` it will be used to encode/decode the values.

## Expire  

An expire (in seconds) can be passed to automatically remove the value from the cache after certain time.

```javascript
const cache = require('@dnode/cache')(client);

const value = await cache(
  'key',
  async () => {
    return 'value';
  },
  { expire: 60 }
);
```

## Invalidate  

The invalidate will be called after getting the value from the cache and can, if return true, force to get a new value.

```javascript
const cache = require('@dnode/cache')(client);

const value = await cache(
  'key',
  async () => {
    return 'value';
  },
  { invalidate: value => value.invalid }
);
```
