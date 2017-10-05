require('@dnode/env');
require('@dnode/express')(app => {
  require('@dnode/middlewares')(app, []);
  require('@dnode/controllers')(app, [
    require('./controller')(),
  ]);
});
