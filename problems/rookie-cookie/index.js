var fs = require('fs')
var path = require('path')
var verify = require('adventure-verify')
var Kefir = require('kefir')

exports.problem = fs.createReadStream(__dirname + '/problem.txt');
exports.solution = fs.createReadStream(__dirname + '/solution.txt');

exports.verify = verify({ modeReset: true }, function (args, t) {
  var f = require(path.resolve(args[0]));
  // test stream outputs
  var test_i = 0
  var answers = ["gsussman's gingerbread cookies are delicious.", "rpominov's monster choco chip cookies are delicious.", "substack's oatmeal d-lux cookies are delicious.", "mminsky's triple coco-butter dilemma cookies are delicious."]
  var batches = ['{"baker": "gsussman", "type": "gingerbread", "deliciousness": 7 }', '{"baker": "haskellcurry", "type": "oatmeal", "deliciousness": 4 }', '{"baker": "halvarian", "type": "choco chip", "deliciousness": 6 }', '{"baker": "rpominov", "type": "monster choco chip", "deliciousness": 9.5 }', '{"baker": "substack", "type": "oatmeal d-lux", "deliciousness": 8.7 }', '{"baker": "substack", "type": "oatmeal regs", "deliciousness": 3 }', '{"baker": "mminsky", "type": "triple coco-butter dilemma", "deliciousness": 10 }']
  var s = f(Kefir.sequentially(1, batches))
  s.onValue(function(x) {
    t.equal(x, answers[test_i])
    test_i=test_i+1
    if (test_i == answers.length) t.end()
  })
});
