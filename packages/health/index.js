module.exports.controller = (healths = {}) => [
  'get',
  [
    '/health',
    async (req, res) => {
      const checks = await Promise.all(
        Object.keys(healths).map(async name => {
          let health = healths[name];
          if (typeof health === 'function') {
            health = { check: health, data: {} };
          }
          let state = 'UP';
          try {
            await health.check();
          } catch (e) {
            state = 'DOWN';
          }
          return { name: name, state, data: health.data };
        })
      );
      if (checks.find(check => check.state === 'DOWN')) {
        res.status(500).send({ outcome: 'DOWN', checks });
      } else {
        res.send({ outcome: 'UP', checks });
      }
    },
  ],
];
