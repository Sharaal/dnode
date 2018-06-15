const Redis = require('ioredis');

module.exports = url => {
  const redis = new Redis(url);
  return {
    clear: async () => await redis.flushdb(),
    delete: async key => await redis.del(key),
    expire: async (key, ttl) => {
      if (typeof ttl === 'object' && ttl.asSeconds) {
        ttl = parseInt(ttl.asSeconds());
      }
      return await redis.expire(key, ttl);
    },
    get: async key => {
      const value = await redis.get(key);
      if (value) {
        return JSON.parse(value);
      }
    },
    redis,
    set: async (key, value, ttl) => {
      value = JSON.stringify(value);
      if (ttl) {
        if (typeof ttl === 'object' && ttl.asSeconds) {
          ttl = parseInt(ttl.asSeconds());
        }
        return await redis.set(key, value, 'EX', ttl);
      }
      return await redis.set(key, value);
    },
  };
};
