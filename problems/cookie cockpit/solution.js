/* NICE! here was my solution: */

var Kefir = require('kefir')

function message (action, id) {
  return { action: action, id: id }
}

function harvestMessage (selection) {
  return message('harvest', selection)
}

function resetMessage (selection) {
  return message('reset', selection)
}

module.exports = function (selections, harvestClicks, resetClicks) {
  var harvestMessages = selections.sampledBy(harvestClicks).map(harvestMessage)
  var resetMessages = selections.sampledBy(resetClicks).map(resetMessage)

  return Kefir.merge([harvestMessages, resetMessages])
}

/*

CRYPTIC KOAN

Do you see how we created a causal chain between clicks on our interface and state in our application?

If you squint and cock your head sideways, the state of an interface can be described by the interactions that a user has taken on it.

*/