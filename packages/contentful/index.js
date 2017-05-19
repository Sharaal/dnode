const contentful = require('contentful');

module.exports = ({ accessToken, space }) => {
  const contentfulClient = contentful.createClient({ accessToken, space });

  async function getEntries(opts) {
    opts.include = opts.include || 10;
    const entries = (await contentfulClient.getEntries(opts)).items;
    entries.map(function flatten(entry) {
      delete entry.sys;
      Object.assign(entry, entry.fields);
      delete entry.fields;
      Object.entries(entry).map(([k, v]) => {
        if (typeof v !== 'object') {
          return;
        }
        if (Array.isArray(v)) {
          return v.map(flatten);
        }
        return flatten(v);
      });
    });
    return entries;
  }

  async function getEntry(id, opts = {}) {
    return (await getEntries(Object.assign({ 'sys.id': id }, opts)))[0];
  }

  return { getEntries, getEntry };
};

module.exports.createClient = module.exports;
