// Exercise 3: Closures
// ---------------------

// 3a. Build a counter factory
// makeCounter() returns a function that increments and returns a count
function makeCounter(start = 0) {
  // YOUR CODE HERE
}

// 3b. Build an adder factory
// makeAdder(n) returns a function that adds n to its argument
function makeAdder(n) {
  // YOUR CODE HERE
}

// 3c. Build a once() function
// once(fn) returns a version of fn that only runs once.
// After the first call, it always returns the first result.
function once(fn) {
  // YOUR CODE HERE
}

// 3d. Build a memoize() function
// memoize(fn) returns a cached version of fn.
// If called with the same argument, return the cached result.
function memoize(fn) {
  // YOUR CODE HERE
}

// Tests
const counter = makeCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3

const counter10 = makeCounter(10);
console.log(counter10()); // 11

const add5 = makeAdder(5);
console.log(add5(3));  // 8
console.log(add5(10)); // 15

let callCount = 0;
const onceGreet = once(() => { callCount++; return "Hello!"; });
console.log(onceGreet()); // "Hello!"
console.log(onceGreet()); // "Hello!"
console.log(callCount);   // 1 — only ran once

let computeCount = 0;
const slowDouble = memoize((n) => { computeCount++; return n * 2; });
console.log(slowDouble(5)); // 10
console.log(slowDouble(5)); // 10 (cached)
console.log(slowDouble(6)); // 12
console.log(computeCount);  // 2 — only computed twice
