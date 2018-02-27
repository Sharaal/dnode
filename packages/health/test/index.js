const assert = require('power-assert');
const express = require('express');
const request = require('supertest');

describe('packages/health', () => {
  it('should have outcome "UP" without any checks', done => {
    const app = express();
    require('@dnode/controllers')(app, [require('../index').controller()]);
    request(app)
      .get('/health')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
        assert.deepEqual(res.body, { outcome: 'UP', checks: [] });
        done();
      });
  });

  it('should have outcome "UP" with positive checks', done => {
    const app = express();
    require('@dnode/controllers')(app, [
      require('../index').controller({
        a: () => {},
        b: () => {},
      }),
    ]);
    request(app)
      .get('/health')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
        assert.deepEqual(res.body, {
          outcome: 'UP',
          checks: [{ name: 'a', state: 'UP', data: {} }, { name: 'b', state: 'UP', data: {} }],
        });
        done();
      });
  });

  it('should have outcome "UP" with positive checks and data', done => {
    const app = express();
    require('@dnode/controllers')(app, [
      require('../index').controller({
        a: { check: () => {}, data: { c: 'd' } },
        b: { check: () => {}, data: { e: 'f' } },
      }),
    ]);
    request(app)
      .get('/health')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
        assert.deepEqual(res.body, {
          outcome: 'UP',
          checks: [{ name: 'a', state: 'UP', data: { c: 'd' } }, { name: 'b', state: 'UP', data: { e: 'f' } }],
        });
        done();
      });
  });

  it('should have outcome "DOWN" if at least one check throws an error', done => {
    const app = express();
    require('@dnode/controllers')(app, [
      require('../index').controller({
        a: () => {
          throw new Error('test');
        },
        b: () => {},
      }),
    ]);
    request(app)
      .get('/health')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500)
      .then(res => {
        assert.deepEqual(res.body, {
          outcome: 'DOWN',
          checks: [{ name: 'a', state: 'DOWN', data: {} }, { name: 'b', state: 'UP', data: {} }],
        });
        done();
      });
  });

  it('should support async checks', done => {
    const app = express();
    require('@dnode/controllers')(app, [
      require('../index').controller({
        a: () => {
          return new Promise((resolve, reject) => {
            process.nextTick(() => {
              reject(new Error('test'));
            });
          });
        },
        b: () => {},
      }),
    ]);
    request(app)
      .get('/health')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500)
      .then(res => {
        assert.deepEqual(res.body, {
          outcome: 'DOWN',
          checks: [{ name: 'a', state: 'DOWN', data: {} }, { name: 'b', state: 'UP', data: {} }],
        });
        done();
      });
  });
});
