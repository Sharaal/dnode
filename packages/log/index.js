const winston = require('winston');

module.exports = ({ level, timestamp } = {}) => {
  if (timestamp) {
    timestamp = () => {
      return new Date().toString();
    };
  }
  return new winston.Logger({
    level,
    transports: [new winston.transports.Console({ timestamp })],
  });
};
