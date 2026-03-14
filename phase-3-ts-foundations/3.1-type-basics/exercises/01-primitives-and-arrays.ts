// Exercise 1: Primitives, Arrays & Tuples
// ----------------------------------------
// Add type annotations to all variables and function signatures.
// Fix any type errors.

// 1a. Add type annotations
let username = "Alice";
let score = 100;
let isLoggedIn = false;

// 1b. Annotate these explicitly (don't rely on inference)
let greeting: /* YOUR TYPE */ = "Hello";
let count: /* YOUR TYPE */ = 0;
let enabled: /* YOUR TYPE */ = true;

// 1c. Typed arrays
let fruits: /* YOUR TYPE */ = ["apple", "banana", "cherry"];
let scores: /* YOUR TYPE */ = [95, 87, 72];

// 1d. Fix the error: this function should only accept numbers
function double(n) {
  return n * 2;
}

// 1e. Typed tuple: [name, age, isActive]
let userRecord: /* YOUR TYPE */ = ["Alice", 30, true];

// 1f. Destructure the tuple with correct types
const [/* YOUR DESTRUCTURE */] = userRecord;

// 1g. Function that returns a [min, max] tuple from a number array
function minMax(nums: number[]): /* YOUR RETURN TYPE */ {
  const sorted = [...nums].sort((a, b) => a - b);
  return [sorted[0], sorted[sorted.length - 1]];
}

const [min, max] = minMax([3, 1, 4, 1, 5, 9]);
console.log(min, max); // 1 9
