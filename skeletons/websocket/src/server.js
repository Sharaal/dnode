require('dotenv-safe').config();

const wss = new (require('ws').Server)({
  port: process.env.PORT,
  verifyClient: require('@dnode/ws-verifyclient-jwt')({
    jwtSecret: process.env.JWT_SECRET,
  }),
});

wss.on('connection', (ws, req) => {
  console.log(req.user);

  ws.on('message', message => {
    console.log(`got ${message}`);
    console.log('send pong');
    ws.send('pong');
  });

  ws.on('close', () => {
    console.log('client disconnected');
  });
});
