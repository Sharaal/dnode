const Redis = require('ioredis');

module.exports = url => {
  const redis = new Redis(url);

  redis.setJSON = (key, value) => redis.set(key, JSON.stringify(value));
  redis.getJSON = async key => JSON.parse(await redis.get(key));

  return redis;
};
