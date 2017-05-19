require('dotenv-safe').config();

const app = require('express')();

require('@dnode/middlewares')(app, []);

require('@dnode/controllers')(app, []);

if (module.parent) {
  module.exports = app;
} else {
  app.listen(process.env.PORT);
}
