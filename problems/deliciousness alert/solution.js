/* NICE! here was my solution: */

function delicious (cookies) {
  if (cookies.deliciousness > 6) 
    return cookies
}

var deliciousnessAlert = function (c) {
  return c.baker + "'s " + c.flavor + " cookies are delicious"
}

module.exports = function (batch) {
  return batch.filter(delicious)
                    .map(deliciousnessAlert)
}

/* 

CRYPTIC KOAN

You can think of streams as an assembly line. By chaining `map`s and `filter`s, we can describe a sequence of procedures that happen to each item in the line. (In time you'll see that we can split and merge these assembly lines, as well).

*/