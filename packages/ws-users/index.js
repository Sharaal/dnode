const EventEmitter = require('events');
const wsMessage = require('@dnode/ws-message');

module.exports = ({ wss }) => {
  const users = new EventEmitter();

  wss.on('connection', (ws, req) => {
    const userId = req.user.userId;
    if (!users[userId]) {
      const user = {
        connections: [],
        send: (controller, body) => {
          user.connections.map(({ ws }) => {
            ws.send(wsMessage.stringify(controller, body));
          });
        },
        userId,
      };
      users[userId] = user;
    }

    req.user = users[userId];
    req.user.connections.push({ ws });

    ws.on('close', () => {
      req.user.connections = req.user.connections.filter(connection => connection.ws !== ws);
      if (req.user.connections.length === 0) {
        users.emit('close', { user: req.user });
        delete users[userId];
      }
    });
  });

  return users;
};
