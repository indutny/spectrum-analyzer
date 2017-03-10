'use strict';

const assert = require('assert');

const InputBuffer = require('../').InputBuffer;

describe('InputBuffer', () => {
  it('should fill from the end', () => {
    const buf = new InputBuffer(4);

    buf.append([ 1 ]);
    assert.deepEqual(buf.getData(), [ 0, 0, 0, 1 ]);

    buf.append([ 2, 3 ]);
    assert.deepEqual(buf.getData(), [ 0, 1, 2, 3 ]);

    buf.append([ 4, 5, 6 ]);
    assert.deepEqual(buf.getData(), [ 3, 4, 5, 6 ]);

    buf.append([ 7, 8, 9, 10 ]);
    assert.deepEqual(buf.getData(), [ 7, 8, 9, 10 ]);

    buf.append([ 11, 12, 13, 14, 15 ]);
    assert.deepEqual(buf.getData(), [ 12, 13, 14, 15 ]);
  });

  it('should apply Hamming window', () => {
    const buf = new InputBuffer(8, InputBuffer.windowFunctions.hamming);

    buf.append([ 1, 1, 1, 1, 1, 1, 1, 1 ]);
    assert.deepEqual(buf.computeWindowed(), [
      0.08000000000000002,
      0.25319469114498255,
      0.6423596296199047,
      0.9544456792351128,
      0.9544456792351128,
      0.6423596296199048,
      0.25319469114498266,
      0.08000000000000002
    ]);
  });

  it('should apply Blackman-Harris window', () => {
    const buf = new InputBuffer(8, InputBuffer.windowFunctions.blackmanHarris4);

    buf.append([ 1, 1, 1, 1, 1, 1, 1, 1 ]);
    assert.deepEqual(buf.computeWindowed(), [
      0.000060000000000001025,
      0.03339172347815117,
      0.332833504298565,
      0.8893697722232837,
      0.8893697722232838,
      0.3328335042985652,
      0.03339172347815122,
      0.000060000000000001025
    ]);
  });
});
