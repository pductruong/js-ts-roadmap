// Exercise 1: Typed Functions
// ----------------------------

// 1a. Add type annotations to all parameters and return types

function add(a, b) {
  return a + b;
}

function greet(name, greeting = "Hello") {
  return `${greeting}, ${name}!`;
}

function log(message, level?) {
  console.log(`[${level ?? "info"}] ${message}`);
}

// 1b. Define a type for a function that takes a number and returns a boolean
type NumberPredicate = // YOUR CODE HERE

// 1c. Write a higher-order function with typed parameters
// Takes an array of T and a predicate, returns filtered array
function filter<T>(arr: T[], predicate: /* YOUR TYPE */): T[] {
  return arr.filter(predicate);
}

// 1d. Define a type for a mapper function, then write map()
type Mapper<T, U> = // YOUR CODE HERE
function map<T, U>(arr: T[], mapper: Mapper<T, U>): U[] {
  return arr.map(mapper);
}

// Tests
console.log(add(2, 3));             // 5
console.log(greet("Alice"));        // "Hello, Alice!"
console.log(greet("Bob", "Hi"));    // "Hi, Bob!"
log("Server started", "info");
log("File not found", "warn");

const isEven: NumberPredicate = n => n % 2 === 0;
console.log(filter([1, 2, 3, 4, 5], isEven)); // [2, 4]

const toStr: Mapper<number, string> = n => String(n);
console.log(map([1, 2, 3], toStr)); // ["1", "2", "3"]
