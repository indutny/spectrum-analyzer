'use strict';

const PI2 = Math.PI * 2;

function blackmanHarris4(n, N) {
  const ratio = n / (N - 1);
  return 0.35875 - 0.48829 * Math.cos(PI2 * ratio) +
      0.14128 * Math.cos(2 * PI2 * ratio) - 0.01168 * Math.cos(3 * PI2 * ratio);
}

function hamming(n, N) {
  return 0.54 - 0.46 * Math.cos(PI2 * n / (N - 1));
}

function InputBuffer(size, windowFn) {
  this.size = size;
  this.windowFn = windowFn || hamming;
  this._raw = new Array(size).fill(0);
  this._windowed = new Array(size).fill(0);
  this._window = new Array(size).fill(0);

  for (let i = 0; i < this._window.length; i++)
    this._window[i] = this.windowFn(i, this._window.length);
}
module.exports = InputBuffer;

InputBuffer.windowFunctions = {
  blackmanHarris4: blackmanHarris4,
  hamming: hamming
};

InputBuffer.prototype.getData = function getData() {
  return this._raw;
};

InputBuffer.prototype.computeWindowed = function computeWindowed() {
  for (let i = 0; i < this._raw.length; i++)
    this._windowed[i] = this._window[i] * this._raw[i];
  return this._windowed;
};

InputBuffer.prototype.append = function append(data) {
  let writeOff = Math.max(0, this.size - data.length);
  const limit = this.size - writeOff;

  // Free some space for the data
  if (writeOff > 0)
    this._raw.copyWithin(0, data.length);

  for (let i = Math.max(0, data.length - limit); i < data.length; i++)
    this._raw[writeOff++] = data[i];
};
