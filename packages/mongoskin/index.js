const mongoskin = require('mongoskin');

module.exports = (url, collections = []) => {
  const db = mongoskin.db(url, { safe: true });
  db.toObjectID = mongoskin.helper.toObjectID;
  for (const [collection, indexes = []] of collections) {
    db.bind(collection);
    for (const [keys, options = {}] of indexes) {
      db[collection].ensureIndex(keys, options, () => {});
    }
  }
  return db;
};
