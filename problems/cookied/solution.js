/* NICE! here was my solution: */

var Kefir = require('kefir')
var post = require('post-json')

function delicious (cookies) {
  if (cookies.deliciousness > 6) 
    return cookies
}

function gross (cookies) {
  if (cookies.deliciousness < 6) 
    return cookies
}

function praiseMessages (b) {
  return { action: 'praise', baker: b.baker }
}

function scoldMessage (b) {
  return { action: 'scold', baker: b.baker }
}

module.exports = function (batches, url) {

  var b           = batches
  praiseMessagess = b.filter(delicious).map(praiseMessages)
  scoldMessages   = b.filter(gross).map(scoldMessage)

  praiseMessagess.merge(scoldMessages)
                 .onValue(function (msg) { post(url, msg) })
}

/*

CRYPTIC KOAN

Think of `onValue` as the business end of a hose. It represents the point where our values leave our stream, where we send them off to act on the outside world.

*/