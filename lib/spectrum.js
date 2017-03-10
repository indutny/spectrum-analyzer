'use strict';

const FFT = require('fft.js');
const InputBuffer = require('./spectrum/input-buffer');

const HALF_PI = Math.PI / 2;

function Spectrum(size, windowFn) {
  this.size = size;
  this.fft = new FFT(size);
  this.freq = this.fft.createComplexArray();
  this.input = this.fft.createComplexArray();
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

  this.fft.realTransform(this.freq, this.fft.toComplexArray(raw, this.input));

  const norm = Math.pow(this.fft.size, 2);
  for (let i = 0; i < this.freq.length; i += 2) {
    const re = this.freq[i];
    const im = this.freq[i + 1];

    const power = Math.pow(re, 2) + Math.pow(im, 2);
    const phase = Math.atan2(im, re) / HALF_PI;

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
