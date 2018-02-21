const _ = {
  pick: require('lodash.pick'),
};
const fs = require('fs');
const path = require('path');

module.exports = () => {
  if (fs.existsSync(path.join(process.cwd(), '.env.example'))) {
    require('dotenv-safe').config();
  } else if (fs.existsSync(path.join(process.cwd(), '.env'))) {
    require('dotenv').config();
  }
  process.env.NODE_ENV = process.env.NODE_ENV || 'production';
};

module.exports.controller = () => {
  let env = {};
  try {
    const keys = fs
      .readFileSync(path.join(process.cwd(), '.env.example'), 'utf-8')
      .split('\n')
      .map(line => {
        const matches = line.match(/([A-Z_]*)=.*? #info/);
        if (matches) {
          return matches[1];
        }
      })
      .filter(key => key);
    env = _.pick(process.env, keys);
  } catch (e) {
    if (e.code !== 'ENOENT') {
      throw e;
    }
  }
  return [
    'get',
    [
      '/env',
      async (req, res) => {
        res.send(env);
      },
    ],
  ];
};
