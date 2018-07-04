[![dependencies | 2 | 17](https://img.shields.io/badge/dependencies-2%20|%2017-blue.svg)](DEPENDENCIES.md)

# Usage

## Sender

```javascript
const messages = await require('@dnode/messages')({
  redisUrl: process.env.REDIS_URL,
});
const id = messages.send({ example: 'example' });
```

## Receiver

```javascript
const messages = await require('@dnode/messages')({
  redisUrl: process.env.REDIS_URL,
});
messages
  .handle(async (message, id) => {
    console.log(`--- message (id: ${id})`);
    console.log(message);
  })
  .on('error', (err, message) => {
    console.log(err);
  });
```
