
// 1 maptrap 
// function square (x) { return x*x }

// module.exports = function (stream) {
//   return stream.map(square)
// }


// 2 primetime

// var isprime = require('is-prime')
 
// module.exports = function (stream) {
// 	return stream.filter(isprime)
// }   


// 3 rookie cookie

  // var is_delicious = function (c) {
  // 	if (c.deliciousness > 6) return c
  // }

  // var print_delicious_batch = function (c) {
  // 	return c.baker + "'s " + c.type + " cookies are delicious."
  // }

  // module.exports = function (stream) {
  // 	return stream.map(JSON.parse)
  // 				 .filter(is_delicious)
  // 				 .map(print_delicious_batch)
  // }


// 5 cookie-farming

var Kefir = require('kefir')
var average = require('average')

function deliciousness_estimate (a, b) {
  return (a*Math.LN2) * (3 / b)
}

module.exports = function (A_stream, B_stream) {
  var results = Kefir.combine([A_stream, B_stream], deliciousness_estimate)
  var every250ms = Kefir.interval(250, 1)
  return results.bufferBy(every250ms)
                .map(average)
                .map(Math.round)
}

