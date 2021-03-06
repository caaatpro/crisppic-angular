'use strict';

var config = require('./server/config/config'),
    mongo = require('./server/config/mongo'),
    koaConfig = require('./server/config/koa'),
    ws = require('./server/config/ws'),
    co = require('co'),
    koa = require('koa'),
    app = koa();

module.exports = app;

app.init = co.wrap(function *() {
  // initialize mongodb and populate the database with seed data if empty
  yield mongo.connect();

  // koa config
  koaConfig(app);

  // create http and websocket servers and start listening for requests
  app.server = app.listen(config.app.port);
  ws.listen(app.server);

  console.log('KOAN listening on port ' + config.app.port);
});

// auto init if this app is not being initialized by another module (i.e. using require('./app').init();)
if (!module.parent) {
  app.init().catch(function (err) {
    console.error(err.stack);
    process.exit(1);
  });
}
