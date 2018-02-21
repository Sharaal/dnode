const moment = require('moment');
const parse = require('parse-duration');

module.exports = ms => {
  if (typeof ms !== 'number') {
    ms = parse(ms);
  }
  return moment.duration(ms);
};
