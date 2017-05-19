require('dotenv-safe').config();

const app = require('express')();
app.disable('x-powered-by');

require('@dnode/middlewares')(app, []);

require('@dnode/controllers')(app, [requrire('./controller')]);

if (module.parent) {
  module.exports = app;
} else {
  app.listen(process.env.PORT);
}
