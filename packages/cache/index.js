module.exports = client => async (key, fallback, callback, expire) => {
  let hit = true;
  let value = await client.getJSON(key);
  if (value) {
    if (await callback(value, hit)) {
      hit = false;
    }
  } else {
    hit = false;
  }
  if (!hit) {
    value = await fallback();
    callback(value);
    await client.setJSON(key, value);
    if (client.expire && expire) {
      client.expire(key, expire);
    }
  }
};
