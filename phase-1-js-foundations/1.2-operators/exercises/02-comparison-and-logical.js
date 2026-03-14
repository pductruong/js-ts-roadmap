// Exercise 2: Comparison & Logical Operators
// ------------------------------------------

// 2a. Return true if n is between min and max (inclusive)
function inRange(n, min, max) {
  // YOUR CODE HERE
}

// 2b. Return true if the string is non-empty AND longer than minLength
function isValidString(str, minLength) {
  // YOUR CODE HERE
}

// 2c. Return true if at least one of the values is truthy
function anyTruthy(a, b, c) {
  // YOUR CODE HERE
}

// 2d. Predict the output of each expression and write it as a comment.
// Then uncomment to verify.
// console.log(0 == false);       // ?
// console.log(0 === false);      // ?
// console.log("" == false);      // ?
// console.log(null == undefined);// ?
// console.log(null === undefined);// ?
// console.log(NaN === NaN);      // ?

// Tests
console.log(inRange(5, 1, 10));    // true
console.log(inRange(0, 1, 10));    // false
console.log(isValidString("hi", 1)); // true
console.log(isValidString("", 1));   // false
console.log(anyTruthy(0, "", "hello")); // true
console.log(anyTruthy(0, "", null));    // false
