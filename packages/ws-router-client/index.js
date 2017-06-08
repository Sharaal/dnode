const EventEmitter = require('events');
const wsMessage = require('@dnode/ws-message');

module.exports = ({ controllers, ws }) => {
  const events = new EventEmitter();

  ws.on('message', async message => {
    const [controller, body] = wsMessage.parse(message);
    if (!controllers[controller]) {
      return;
    }
    try {
      await controllers[controller]({ body });
    } catch (e) {
      events.emit('error', { body, controller, e });
    }
  });

  return events;
};
