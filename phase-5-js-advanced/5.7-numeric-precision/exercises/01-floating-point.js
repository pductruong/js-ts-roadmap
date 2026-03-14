// Exercise 1: Floating Point & IEEE 754
// ---------------------------------------

// 1a. Predict and explain the output BEFORE running
// Write your prediction as a comment, then uncomment to verify.

// console.log(0.1 + 0.2);           // ?
// console.log(0.1 + 0.2 === 0.3);   // ?
// console.log(0.3 - 0.1);           // ?
// console.log(1.005.toFixed(2));     // ?  (surprising!)
// console.log(9007199254740992 === 9007199254740993); // ?
// console.log(NaN === NaN);          // ?
// console.log(-0 === 0);             // ?
// console.log(typeof NaN);           // ?
// console.log(1 / 0);               // ?
// console.log(-1 / 0);              // ?
// console.log(0 / 0);               // ?

// 1b. Write a safe float comparison function
function floatEqual(a, b) {
  // YOUR CODE HERE: use Number.EPSILON with relative tolerance
}

// 1c. Write a function that correctly detects NaN (not coercing)
function isReallyNaN(value) {
  // YOUR CODE HERE: use Number.isNaN
}

// 1d. Write a function that detects -0
function isNegativeZero(value) {
  // YOUR CODE HERE: use Object.is
}

// 1e. Fix the floating point sum
// Returns the correct sum using integer arithmetic (multiply by 100, sum, divide)
function sumMoney(...amounts) {
  // amounts are dollar amounts like 0.1, 0.2, 0.3
  // YOUR CODE HERE: round to cents, sum, convert back
}

// 1f. Identify which numbers are unsafe (lose precision)
function isSafeForInteger(n) {
  // YOUR CODE HERE: use Number.isSafeInteger
}

// Tests
console.log("--- Float comparison ---");
console.log(floatEqual(0.1 + 0.2, 0.3));    // true
console.log(floatEqual(0.1 + 0.2, 0.31));   // false

console.log("\n--- NaN detection ---");
console.log(isReallyNaN(NaN));           // true
console.log(isReallyNaN("hello"));       // false (not NaN — it's a string)
console.log(isReallyNaN(undefined));     // false

console.log("\n--- Negative zero ---");
console.log(isNegativeZero(-0));         // true
console.log(isNegativeZero(0));          // false
console.log(isNegativeZero(-1));         // false

console.log("\n--- Money sum ---");
console.log(sumMoney(0.1, 0.2));         // 0.3
console.log(sumMoney(0.1, 0.2, 0.3));   // 0.6
console.log(sumMoney(1.99, 2.01));       // 4

console.log("\n--- Safe integers ---");
console.log(isSafeForInteger(42));                        // true
console.log(isSafeForInteger(Number.MAX_SAFE_INTEGER));   // true
console.log(isSafeForInteger(Number.MAX_SAFE_INTEGER + 1)); // false
