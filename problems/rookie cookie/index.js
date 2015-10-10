var fs = require('fs')
var path = require('path')
var verify = require('adventure-verify')
var Kefir = require('kefir')

exports.problem = fs.createReadStream(__dirname + '/problem.txt');
exports.solution = fs.createReadStream(__dirname + '/solution.txt');

var messages = [
  { baker: 'elsehow', flavor: 'triple choco dilemma', deliciousness: 7 }
    , { baker: 'substack', flavor: 'oatmeal', deliciousness: 3 }
    , { baker: 'mminsky', flavor: 'fig', deliciousness: 9 }
    , { baker: 'gsussman', flavor: 'gingerbread supreme', deliciousness: 8 }
    , { baker: 'rpominov', flavor: 'salt-n-toffee gladiator', deliciousness: 9 }
    , { baker: 'rhickey', flavor: 'bartok special', deliciousness: 5 }
]
exports.verify = verify({ modeReset: true }, function (args, t) {
    var f = require(path.resolve(args[0]));
    // test stream outputs
    var test_i = 0
    var answers = [7,3,9,8,9,5]
    var s = f(Kefir.sequentially(1, messages))
    s.onValue(function(x) {
        t.equal(x, answers[test_i], 'should be ' + answers[test_i])
        test_i=test_i+1
        if (test_i == answers.length) t.end()
    })
});