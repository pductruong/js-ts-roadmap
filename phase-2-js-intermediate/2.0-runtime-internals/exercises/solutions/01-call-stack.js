// Solution: Call Stack

// 1a.
function third() { console.log("third"); }
function second() {
  console.log("second - before third");
  third();
  console.log("second - after third");
}
function first() {
  console.log("first - before second");
  second();
  console.log("first - after second");
}
first();
// Output: first - before second, second - before third, third, second - after third, first - after second

// 1b. Scope chain
const value = "global";
function outer() {
  const value = "outer";
  function middle() {
    function inner() {
      const value = "inner";
      console.log("inner:", value); // "inner"
    }
    console.log("middle:", value); // "outer" — middle has no own value, goes up to outer
    inner();
  }
  middle();
  console.log("outer:", value); // "outer"
}
outer();
console.log("global:", value); // "global"

// 1c. Fixed countdown
function countDownFixed(n) {
  if (n < 0) return; // base case
  console.log(n);
  countDownFixed(n - 1);
}
countDownFixed(5);

// 1d. Hoisting
// var x is hoisted to the top of foo() as `var x = undefined`
// So the first console.log sees `undefined`, not the global x = 1
var x = 1;
function foo() {
  console.log(x); // undefined — hoisted var x shadows global, but not yet assigned
  var x = 2;
  console.log(x); // 2
}
foo();
console.log(x); // 1 — global x unchanged
// Explanation: `var` declarations are hoisted to the top of their function scope.
// The local `var x` shadows the global `x` for the entire function body,
// but its value is `undefined` until the assignment runs.
