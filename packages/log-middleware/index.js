const morgan = require('morgan');

module.exports = ({ format: format = 'tiny', log: log = console.log } = {}) =>
  morgan(format, {
    stream: {
      write: message => {
        log(message.replace('\n', ''));
      },
    },
  });
