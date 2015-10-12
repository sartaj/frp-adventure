/* NICE! here was my solution: */

function deliciousness (batch) {
  return batch.deliciousness
}

module.exports = function (batches) {
  return batches.map(deliciousness)
}


/* 

CRYPTIC KOAN 

Streams are a way of reasoning about the many values that a variable takes on throughout the course of a program. The same way a TV channel lets us reason about many individual transmissions, or a river lets us reason about many individual water molecules. It allows us to see a sequence of events at a different level of granularity, so that we can more easily talk about processes a number of atomic elements.

*/
