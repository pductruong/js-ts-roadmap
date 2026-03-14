// Exercise 2: BigInt & Edge Cases
// ---------------------------------

// 2a. Factorial using BigInt — can handle arbitrarily large numbers
function factorial(n) {
  // YOUR CODE HERE: use BigInt, return a BigInt
}

// 2b. Fibonacci using BigInt — no precision loss for large indices
function fibonacci(n) {
  // YOUR CODE HERE: iterative, using BigInt arithmetic
}

// 2c. Write a function that converts a BigInt to a formatted string with commas
function formatBigInt(n) {
  // YOUR CODE HERE: convert to string, add commas every 3 digits
}

// 2d. Safe integer operations — detect overflow before it happens
function safeAdd(a, b) {
  // If either operand is not a safe integer, throw a RangeError
  // Otherwise return a + b
  // YOUR CODE HERE
}

// 2e. Explore BigInt edge cases — predict before running:
// console.log(typeof 42n);            // ?
// console.log(10n / 3n);             // ?  (no decimals!)
// console.log(10n % 3n);             // ?
// console.log(2n ** 64n);            // ?
// console.log(BigInt(Number.MAX_SAFE_INTEGER) + 1n); // ?
// console.log(9n > 5);               // ?  (comparison with number OK)
// try { console.log(9n + 5); } catch(e) { console.log(e.message); } // ?

// Tests
console.log(factorial(20n));    // 2432902008176640000n
console.log(factorial(100n));   // a very large number

console.log(fibonacci(50n));    // 12586269025n
console.log(fibonacci(100n));   // 354224848179261915075n

console.log(formatBigInt(1234567890n));  // "1,234,567,890"
console.log(formatBigInt(factorial(20n))); // "2,432,902,008,176,640,000"

console.log(safeAdd(100, 200));                         // 300
try { safeAdd(Number.MAX_SAFE_INTEGER, 1); }
catch (e) { console.log(e.message); }                   // RangeError
