const express = require('express');

module.exports = async initialize => {
  const app = express();
  app.disable('x-powered-by');

  await initialize(app, express);

  const port = process.env.PORT;
  if (!port) {
    throw new Error('missing port');
  }
  app.listen(port, () => {
    console.log(`app listen on port ${port}`);
  });
};
