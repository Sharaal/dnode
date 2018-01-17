const assert = require('assert');
const express = require('express');
const request = require('supertest');

describe('packages/health', () => {
  it('should have outcome "UP" without any checks', done => {
    const app = express();

    const health = require('../index')();
    require('@dnode/controllers')(app, [health]);

    request(app)
      .get('/health')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
        assert.equal(res.body.outcome, 'UP');
        assert.equal(res.body.checks.length, 0);
        done();
      });
  });

  it('should have outcome "UP" with positive checks', done => {
    const app = express();

    const health = require('../index')({
      a: () => {},
      b: () => {},
    });
    require('@dnode/controllers')(app, [health]);

    request(app)
      .get('/health')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
        assert.equal(res.body.outcome, 'UP');
        assert.equal(res.body.checks.length, 2);

        assert.equal(res.body.checks[0].name, 'a');
        assert.equal(res.body.checks[0].state, 'UP');
        assert.deepEqual(res.body.checks[0].data, {});

        assert.equal(res.body.checks[1].name, 'b');
        assert.equal(res.body.checks[1].state, 'UP');
        assert.deepEqual(res.body.checks[1].data, {});

        done();
      });
  });

  it('should have outcome "UP" with positive checks and data', done => {
    const app = express();

    const health = require('../index')({
      a: { check: () => {}, data: { c: 'd' } },
      b: { check: () => {}, data: { e: 'f' } },
    });
    require('@dnode/controllers')(app, [health]);

    request(app)
      .get('/health')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
        assert.equal(res.body.outcome, 'UP');
        assert.equal(res.body.checks.length, 2);

        assert.equal(res.body.checks[0].name, 'a');
        assert.equal(res.body.checks[0].state, 'UP');
        assert.deepEqual(res.body.checks[0].data, { c: 'd' });

        assert.equal(res.body.checks[1].name, 'b');
        assert.equal(res.body.checks[1].state, 'UP');
        assert.deepEqual(res.body.checks[1].data, { e: 'f' });

        done();
      });
  });

  it('should have outcome "DOWN" if at least one check throws an error', done => {
    const app = express();

    const health = require('../index')({
      a: () => {
        throw new Error('test');
      },
      b: () => {},
    });
    require('@dnode/controllers')(app, [health]);

    request(app)
      .get('/health')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500)
      .then(res => {
        assert.equal(res.body.outcome, 'DOWN');
        assert.equal(res.body.checks.length, 2);

        assert.equal(res.body.checks[0].name, 'a');
        assert.equal(res.body.checks[0].state, 'DOWN');
        assert.deepEqual(res.body.checks[0].data, {});

        assert.equal(res.body.checks[1].name, 'b');
        assert.equal(res.body.checks[1].state, 'UP');
        assert.deepEqual(res.body.checks[1].data, {});

        done();
      });
  });
});
