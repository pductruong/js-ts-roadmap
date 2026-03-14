function inRange(n, min, max) { return n >= min && n <= max; }
function isValidString(str, minLength) { return str.length > 0 && str.length > minLength; }
function anyTruthy(a, b, c) { return !!(a || b || c); }

// Answers:
// 0 == false       => true
// 0 === false      => false
// "" == false      => true
// null == undefined => true
// null === undefined => false
// NaN === NaN      => false (NaN is never equal to itself — use Number.isNaN())

console.log(inRange(5, 1, 10));    // true
console.log(inRange(0, 1, 10));    // false
console.log(isValidString("hi", 1)); // true
console.log(isValidString("", 1));   // false
console.log(anyTruthy(0, "", "hello")); // true
console.log(anyTruthy(0, "", null));    // false
