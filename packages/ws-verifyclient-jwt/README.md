[![dependencies | 1 | 15](https://img.shields.io/badge/dependencies-1%20|%2015-blue.svg)](DEPENDENCIES.md)

# Usage

## Server

```javascript
const wss = new (require('ws').Server)({
  port: process.env.PORT,
  verifyClient: require('@dnode/ws-verifyclient-jwt')({
    jwtSecret: process.env.JWT_SECRET,
  }),
});

wss.on('connection', (ws, req) => {
  console.log(req.user);
});
```

## Client

```javascript
const ws = new (require('ws'))('url', {
  headers: {
    Authorization: 'Bearer token',
  },
});
```
