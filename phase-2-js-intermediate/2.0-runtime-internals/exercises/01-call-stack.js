// Exercise 1: Call Stack & Execution Context
// -------------------------------------------

// 1a. Trace the call stack
// Before running, write the expected output order as comments.
// Then run to verify.

function third() {
  console.log("third");
  // console.trace(); // Uncomment to see the actual stack trace
}

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

// Expected output order:
// ?
// ?
// ?
// ?
// ?
first();


// 1b. Scope chain — what does each console.log print?
const value = "global";

function outer() {
  const value = "outer";

  function middle() {
    // No `value` here — what does it find?

    function inner() {
      const value = "inner";
      console.log("inner:", value); // ?
    }

    console.log("middle:", value); // ?
    inner();
  }

  middle();
  console.log("outer:", value); // ?
}

outer();
console.log("global:", value); // ?


// 1c. Fix the stack overflow
// This function causes: RangeError: Maximum call stack size exceeded
// Add a base case to fix it.
function countDown(n) {
  console.log(n);
  return countDown(n - 1); // infinite recursion!
}

// Fixed version:
function countDownFixed(n) {
  // YOUR CODE HERE: add a base case
}

countDownFixed(5); // should print: 5 4 3 2 1 0


// 1d. Predict the output of this hoisting + closure example
var x = 1;

function foo() {
  console.log(x); // ?
  var x = 2;
  console.log(x); // ?
}

foo();
console.log(x); // ?
// Explain why in a comment:
// YOUR EXPLANATION:
