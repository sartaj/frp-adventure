var fs = require('fs')
var path = require('path')
var verify = require('adventure-verify')
var Kefir = require('kefir')
var app =  require('express')()
var bodyParser = require('body-parser')
app.use(bodyParser.json())

exports.problem = fs.createReadStream(__dirname + '/problem.txt');
exports.solution = fs.createReadStream(__dirname + '/solution.txt');

var messages = [
  { baker: 'elsehow', flavor: 'triple choco dilemma', deliciousness: 7 }
    , { baker: 'substack', flavor: 'oatmeal', deliciousness: 3 }
    , { baker: 'ghopper', flavor: 'fig', deliciousness: 9 }
    , { baker: 'gsussman', flavor: 'gingerbread supreme', deliciousness: 8 }
    , { baker: 'rpominov', flavor: 'salt-n-toffee gladiator', deliciousness: 9 }
    , { baker: 'rhickey', flavor: 'bartok special', deliciousness: 5 }
]


exports.verify = verify({ modeReset: true }, function (args, t) {
    var f = require(path.resolve(args[0]));
    // test stream outputs
    var test_i = 0
    var url = 'http://localhost:8888'
    var answers = [
        {action: 'praise', baker: 'elsehow'}
        , {action: 'scold', baker: 'substack'}
        , {action: 'praise', baker: 'ghopper'}
        , {action: 'praise', baker: 'gsussman'}
        , {action: 'praise', baker: 'rpominov'}
        , {action: 'scold', baker: 'rhickey'}
    ]
    app.post('/', function (req, res) {
        var x = req.body
        t.deepEquals(x, answers[test_i], 'should be ' + JSON.stringify(answers[test_i]))
        test_i=test_i+1
        if (test_i == answers.length) {
          t.end()
          process.exit(0)
        }
    })
    setTimeout(function () {
      f(Kefir.sequentially(1, messages), url)
    }, 150)
});
app.listen(8888)


