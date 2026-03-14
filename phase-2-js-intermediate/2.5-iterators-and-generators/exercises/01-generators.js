// Exercise 1: Generators
// -----------------------

// 1a. Generator that yields numbers from start to end (inclusive)
function* range(start, end) {
  // YOUR CODE HERE
}

// 1b. Infinite generator that yields Fibonacci numbers
function* fibonacci() {
  // 0, 1, 1, 2, 3, 5, 8, 13, ...
  // YOUR CODE HERE
}

// 1c. Generator that takes an iterable and yields each item doubled
function* doubled(iterable) {
  // YOUR CODE HERE
}

// 1d. Helper: take first n items from any iterable
function take(n, iterable) {
  // YOUR CODE HERE
}

// Tests
console.log([...range(1, 5)]);           // [1, 2, 3, 4, 5]
console.log([...range(3, 3)]);           // [3]
console.log(take(8, fibonacci()));       // [0, 1, 1, 2, 3, 5, 8, 13]
console.log([...doubled([1, 2, 3])]);    // [2, 4, 6]
console.log(take(3, doubled(range(1, 10)))); // [2, 4, 6]
