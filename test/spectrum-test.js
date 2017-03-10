'use strict';

const assert = require('assert');

const Spectrum = require('../');

describe('spectrum-analyzer', () => {
  it('should compute spectrum+phase of cosine wave', () => {
    const s = new Spectrum(2048);

    const cos = new Array(s.size);
    const sin = new Array(s.size);
    for (let i = 0; i < cos.length; i++) {
      sin[i] = Math.sin(2 * Math.PI * i / 128);
      cos[i] = Math.cos(2 * Math.PI * i / 128);
    }

    s.appendData(cos);
    s.recompute();

    const power = s.getPower();

    let total = 0;
    let max = 0;
    let maxBin = 0;
    for (let i = 0; i < power.length; i++) {
      total += power[i];
      if (max > power[i])
        continue;
      max = power[i];
      maxBin = i;
    }

    let avg = 0;
    for (let i = 0; i < power.length; i++) {
      const weight = power[i] / total;
      avg += weight * i;
    }

    assert.strictEqual(avg.toFixed(3), '16.000');
    assert.strictEqual(maxBin, 16);
    assert.strictEqual(s.getPhase()[maxBin].toFixed(3), '0.000');

    s.appendData(sin);
    s.recompute();
    assert.strictEqual(s.getPhase()[maxBin].toFixed(3), '1.000');
  });
});
