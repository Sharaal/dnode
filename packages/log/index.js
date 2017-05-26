const winston = require('winston');

module.exports = ({ level }) => {
  return new winston.Logger({
    level,
    transports: [
      new winston.transports.Console({
        timestamp: () => {
          return new Date().toString();
        }
      })
    ]
  });
};
