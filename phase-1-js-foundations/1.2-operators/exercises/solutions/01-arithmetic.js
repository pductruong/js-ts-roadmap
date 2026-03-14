function remainder(a, b) { return a % b; }
function power(base, exp) { return base ** exp; }
function isEven(n) { return n % 2 === 0; }
function intDivide(a, b) { return Math.floor(a / b); }

console.log(remainder(10, 3));   // 1
console.log(remainder(7, 2));    // 1
console.log(power(2, 10));       // 1024
console.log(power(3, 3));        // 27
console.log(isEven(4));          // true
console.log(isEven(7));          // false
console.log(intDivide(7, 2));    // 3
console.log(intDivide(10, 3));   // 3
