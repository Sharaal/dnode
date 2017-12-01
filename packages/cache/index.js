module.exports = client => async (key, fallback, callback, expire) => {
  if (!expire && typeof callback !== 'function') {
    expire = callback;
    callback = undefined;
  }
  let hit = true;
  let value = await client.getJSON(key);
  if (value) {
    if (callback && (await callback(value, hit))) {
      hit = false;
    }
  } else {
    hit = false;
  }
  if (!hit) {
    value = await fallback();
    if (callback) {
      callback(value);
    }
    await client.setJSON(key, value);
    if (client.expire && expire) {
      client.expire(key, expire);
    }
  }
  return value;
};
