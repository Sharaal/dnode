require('@dnode/env')();

const logger = require('@dnode/log')({
  level: process.env.LOG_LEVEL,
});
logger.info('initializing server');

require('@dnode/express')(app => {
  require('@dnode/middlewares')(app, [
    require('@dnode/log-middleware')({ log: logger.info }),
  ]);
  require('@dnode/controllers')(app, [
    require('@dnode/env').controller(),
    require('@dnode/health').controller(),
    require('@dnode/version').controller(),
    require('./controller')()
  ]);
}, { log: logger.info });
