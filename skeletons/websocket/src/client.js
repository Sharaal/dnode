require('dotenv-safe').config();

const ws = new (require('ws'))(`ws://localhost:${process.env.PORT}`, {
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjF9.s4vE0w6cUg68FMf7GjCRpweMCQ92MdFjYM5apky7MHE',
  },
});

ws.on('open', () => {
  console.log('open');
  console.log('send ping');
  ws.send('ping');
});

ws.on('close', () => {
  console.log('server disconnected');
});

ws.on('message', message => {
  console.log(`got ${message}`);
});
