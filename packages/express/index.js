const express = require('express');

module.exports = async (init, { log: log = console.log } = {}) => {
  const app = express();
  app.disable('x-powered-by');

  await init(app, express);

  const port = process.env.PORT;
  if (!port) {
    throw new Error('missing port');
  }
  app.listen(port, () => {
    log(`app listen on port ${port}`);
  });
};
