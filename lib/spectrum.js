'use strict';

const FFT = require('fft.js');
const InputBuffer = require('./spectrum/input-buffer');

function Spectrum(size, windowFn) {
  this.size = size;
  this.fft = new FFT(size);
  this.freq = this.fft.createComplexArray();
  this.power = new Array(size).fill(0);
  this.phase = new Array(size).fill(0);
  this.buffer = new InputBuffer(size, windowFn);
}
module.exports = Spectrum;

// Mostly for testing
Spectrum.InputBuffer = InputBuffer;

Spectrum.prototype.appendData = function appendData(data) {
  this.buffer.append(data);
};

Spectrum.prototype.recompute = function recompute() {
  const raw = this.buffer.computeWindowed();

  this.fft.realTransform(this.freq, raw);

  const norm = Math.pow(this.fft.size, 2);
  const halfLen = this.freq.length >>> 1;
  let lastPhase = 0;
  for (let i = 0; i < halfLen; i += 2) {
    const re = this.freq[i];
    const im = this.freq[i + 1];

    const power = Math.pow(re, 2) + Math.pow(im, 2);
    let phase = Math.atan2(im, re) / Math.PI;

    // Link phases
    if (phase < lastPhase)
      phase += Math.round(lastPhase - phase);
    else
      phase -= Math.round(phase - lastPhase);
    lastPhase = phase;

    this.power[i >>> 1] = power / norm;
    this.phase[i >>> 1] = phase;
  }
};

Spectrum.prototype.getPower = function getPower() {
  return this.power;
};

Spectrum.prototype.getPhase = function getPhase() {
  return this.phase;
};
