module.exports = redis => async (key, get, options = {}) => {
  if ((typeof options === 'object' && options.asSeconds) || typeof options === 'number') {
    options = { expire: options };
  }
  let value = await client.get(key);
  if (!value || (options.invalidate && options.invalidate(value))) {
    value = await get();
    await client.set(key, value, options.expire);
  } else if (options.refresh) {
    await client.expire(key, options.expire);
  }
  return value;
};
