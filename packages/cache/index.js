module.exports = redis => async (key, get, options = {}) => {
  if ((typeof options === 'object' && options.asSeconds) || typeof options === 'number') {
    options = { expire: options };
  }
  let value = await redis.get(key);
  if (!value || (options.invalidate && options.invalidate(value))) {
    value = await get();
    await redis.set(key, value, options.expire);
  } else if (options.refresh) {
    await redis.expire(key, options.expire);
  }
  return value;
};
