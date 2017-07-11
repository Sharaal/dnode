const assert = require('assert');

const parseDuration = require('../../../packages/parse-duration');

describe('/packages/parse-duration', () => {
  it('1 hour 20 minutes in milliseconds', () => {
    const actual = parseDuration('1h 20m');
    const expected = 4800000;
    assert.deepEqual(actual, expected);
  });

  it('1 hour 20 minutes in seconds (with second parameter)', () => {
    const actual = parseDuration('1h 20m', 's');
    const expected = 4800;
    assert.deepEqual(actual, expected);
  });

  it('1 hour 20 minutes in seconds (with second parameter and plural)', () => {
    const actual = parseDuration('1h 20m', 'seconds');
    const expected = 4800;
    assert.deepEqual(actual, expected);
  });

  it('1 hour 20 minutes in seconds (with "in" keyword)', () => {
    const actual = parseDuration('1h 20m in s');
    const expected = 4800;
    assert.deepEqual(actual, expected);
  });

  it('1 hour 20 minutes in seconds (with "in" keyword and plural)', () => {
    const actual = parseDuration('1h 20m in seconds');
    const expected = 4800;
    assert.deepEqual(actual, expected);
  });

  it('4800000 milliseconds in milliseconds', () => {
    const actual = parseDuration(4800000);
    const expected = 4800000;
    assert.deepEqual(actual, expected);
  });

  it('4800000 milliseconds in seconds', () => {
    const actual = parseDuration(4800000, 'seconds');
    const expected = 4800;
    assert.deepEqual(actual, expected);
  });
    assert.deepEqual(actual, expected);
  });
});
