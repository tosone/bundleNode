'use strict';
var common = require('../common.js');
var path = require('path');
var v8 = require('v8');

var bench = common.createBenchmark(main, {
  path: [
    '',
    '.',
    '//server',
    'C:\\baz\\..',
    'C:baz\\..',
    'bar\\baz'
  ],
  n: [1e6]
});

function main(conf) {
  var n = +conf.n;
  var p = path.win32;
  var input = '' + conf.path;

  // Force optimization before starting the benchmark
  p.isAbsolute(input);
  v8.setFlagsFromString('--allow_natives_syntax');
  eval('%OptimizeFunctionOnNextCall(p.isAbsolute)');
  p.isAbsolute(input);

  bench.start();
  for (var i = 0; i < n; i++) {
    p.isAbsolute(input);
  }
  bench.end(n);
}
