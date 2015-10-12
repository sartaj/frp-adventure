var fs = require('fs')
var path = require('path')
var verify = require('adventure-verify')
var Kefir = require('kefir')

exports.problem = fs.createReadStream(__dirname + '/problem.txt');
exports.solution = fs.createReadStream(__dirname + '/solution.js');

exports.verify = verify({ modeReset: true }, function (args, t) {
    var f = require(path.resolve(args[0]));
    var resp = f()
    var answer = "there are no paths paths are made by walking"
    t.equal(resp, answer, 'should say what i asked you to say.')
    t.end()
});