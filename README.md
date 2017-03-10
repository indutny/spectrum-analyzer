# spectrum-analyzer
[![Build Status](https://secure.travis-ci.org/indutny/spectrum-analyzer.svg)](http://travis-ci.org/indutny/spectrum-analyzer)
[![NPM version](https://badge.fury.io/js/spectrum-analyzer.svg)](https://badge.fury.io/js/spectrum-analyzer)

FFT-based windowed spectrum analyzer.

## Usage

```js
const Spectrum = require('spectrum-analyzer');

const s = new Spectrum(4096);

const input = new Array(4096);
for (let i = 0; i < input.length; i++)
  input[i] = Math.cos(i / 512);

s.appendData(input);
s.recompute();

console.log(s.getPower());
console.log(s.getPhase());
```

#### LICENSE

This software is licensed under the MIT License.

Copyright Fedor Indutny, 2017.

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to permit
persons to whom the Software is furnished to do so, subject to the
following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
USE OR OTHER DEALINGS IN THE SOFTWARE.
