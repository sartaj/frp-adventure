var fs = require('fs')
var path = require('path')
var verify = require('adventure-verify')
var Kefir = require('kefir')

exports.problem = fs.createReadStream(__dirname + '/problem.txt');
exports.solution = fs.createReadStream(__dirname + '/solution.js');

var selections = Kefir.sequentially(250, [11, 12, 28, 13, 42, 48])
var resetClicks = Kefir.sequentially(600, [1, 1])
var harvestClicks = Kefir.sequentially(900, [1, 1])

var answers = [
    { action: 'reset', id: 12 }
    , { action: 'harvest', id: 28 }
    , { action: 'reset', id: 13 }
    ,  { action: 'harvest', id: 48 }
]


exports.verify = verify({ modeReset: true }, function (args, t) {
    var f = require(path.resolve(args[0]));
    // test stream outputs
    var test_i = 0
    var s = f(selections, harvestClicks, resetClicks)
    s.onValue(function(x) {
        t.deepEquals(x, answers[test_i], 'should be ' + JSON.stringify(answers[test_i]))
        test_i=test_i+1
        if (test_i == answers.length) t.end()
    })
});