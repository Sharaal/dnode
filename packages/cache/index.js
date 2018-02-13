module.exports = client => async (key, get, { expire, invalidate, refresh } = {}) => {
  let value;
  if (client.getJSON) {
    value = await client.getJSON(key);
  } else {
    value = await client.get(key);
  }
  if (!value || (invalidate && invalidate(value))) {
    value = await get();
    if (client.setJSON) {
      await client.setJSON(key, value);
    } else {
      await client.set(key, value);
    }
    if (expire) {
      if (expire.seconds) {
        expire = expire.seconds();
      }
      await client.expire(key, expire);
    }
  } else if (refresh) {
    await client.expire(key, expire);
  }
  return value;
};
