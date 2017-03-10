'use strict';

const assert = require('assert');

const Spectrum = require('../');

describe('spectrum-analyzer', () => {
  it('should compute spectrum+phase of cosine wave', () => {
    const s = new Spectrum(2048);

    const data = new Array(s.size);
    for (let i = 0; i < data.length; i++)
      data[i] = Math.cos(i / 512);

    s.appendData(data);
    s.recompute();

    const power = s.getPower();

    let total = 0;
    for (let i = 0; i < power.length; i++)
      total += power[i];

    let avg = 0;
    for (let i = 0; i < power.length; i++) {
      const weight = power[i] / total;
      avg += weight * i;
    }

    assert.strictEqual(avg.toFixed(3), '143.128');
  });
});
