const EventEmitter = require('events');
const wsMessage = require('@dnode/ws-message');

module.exports = ({ controllers, wss }) => {
  const events = new EventEmitter();

  wss.on('connection', (ws, req) => {
    const user = req.user;

    ws.on('message', async message => {
      const [controller, body] = wsMessage.parse(message);
      if (!controllers[controller]) {
        return;
      }
      try {
        await controllers[controller]({ body, user });
      } catch (e) {
        events.emit('error', { body, controller, e, user });
      }
    });
  });

  return events;
};
