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
    var answers = [9, 16, 25, 36, 49, 64, 81]
    var s = f(Kefir.sequentially(1, [3,4,5,6,7,8,9]))
    s.onValue(function(x) {
        t.equal(x, answers[test_i], 'should be ' + answers[test_i])
        test_i=test_i+1
        if (test_i == answers.length) t.end()
    })
});