const mongoskin = require('mongoskin');

module.exports = (url, collections = []) => {
  const db = mongoskin.db(url, { safe: true });
  db.toObjectID = mongoskin.helper.toObjectID;
  for (let collection of collections) {
    if (!Array.isArray(collection)) {
      collection = [collection];
    }
    const [name, indexes = []] = collection;
    db.bind(name);
    for (const [keys, options = {}] of indexes) {
      db[name].ensureIndex(keys, options, () => {});
    }
  }
  return db;
};
