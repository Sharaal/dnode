const morgan = require('morgan');

module.exports.middleware = ({ format: format = 'tiny', log: log = console.log } = {}) =>
  morgan(format, {
    stream: {
      write: message => {
        log(message.replace('\n', ''));
      },
    },
  });
