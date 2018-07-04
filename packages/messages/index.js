const RedisSMQ = require('rsmq');
const RSMQWorker = require('rsmq-worker');
const url = require('url');

module.exports = ({ qname: qname = 'queue', redisUrl } = {}) =>
  new Promise((resolve, reject) => {
    let config = {};
    if (redisUrl) {
      const { auth, hostname, port } = url.parse(redisUrl);
      const password = auth.split(':')[1];

      config = { host: hostname, port, options: { password } };
    }

    const rsmq = new RedisSMQ(config);

    rsmq.createQueue({ qname }, (err, resp) => {
      resolve({
        send: (message, delay) =>
          new Promise((resolve, reject) => {
            message = JSON.stringify(message);
            if (typeof delay === 'object' && delay.asSeconds) {
              delay = parseInt(delay.asSeconds());
            }
            rsmq.sendMessage({ qname, message, delay }, (err, resp) => {
              if (err) {
                reject(err);
              } else {
                resolve(resp);
              }
            });
          }),
        delete: id =>
          new Promise((resolve, reject) => {
            rsmq.deleteMessage({ qname, id }, (err, resp) => {
              if (err) {
                reject(err);
              } else {
                resolve();
              }
            });
          }),
        handle: handler => {
          const worker = new RSMQWorker(qname, { rsmq });
          worker.on('message', async (message, next, id) => {
            try {
              message = JSON.parse(message);
              await handler(message, id);
              next();
            } catch (e) {
              next(e);
            }
          });
          worker.start();
          return worker;
        },
      });
    });
  });
