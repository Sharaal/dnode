# Usage

```javascript
const wss = new (require('ws').Server)({
  port: process.env.PORT,
  verifyClient: require('@dnode/ws-verifyClient-jwt')({
    jwtSecret: process.env.JWT_SECRET,
  }),
});

wss.on('connection', (ws, req) => {
  console.log(req.user);
});
```
