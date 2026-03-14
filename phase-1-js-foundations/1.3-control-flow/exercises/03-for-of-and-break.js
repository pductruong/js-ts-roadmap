// Exercise 3: for...of, for...in, break, continue
// -------------------------------------------------

// 3a. Sum only the positive numbers in an array using for...of
function sumPositive(numbers) {
  // YOUR CODE HERE
}

// 3b. Find the first number in the array divisible by n. Return -1 if none.
function firstDivisibleBy(numbers, n) {
  // Use for...of with break
  // YOUR CODE HERE
}

// 3c. Given an object, return an array of strings "key: value" for each entry
function objectEntries(obj) {
  // Use for...in
  // YOUR CODE HERE
}

// 3d. Return an array with all multiples of 3 skipped (use continue)
function skipMultiplesOfThree(numbers) {
  // YOUR CODE HERE
}

// Tests
console.log(sumPositive([1, -2, 3, -4, 5]));       // 9
console.log(firstDivisibleBy([3, 7, 11, 14], 7));   // 7
console.log(firstDivisibleBy([3, 7, 11], 5));       // -1
console.log(objectEntries({ name: "Alice", age: 30 })); // ["name: Alice", "age: 30"]
console.log(skipMultiplesOfThree([1, 2, 3, 4, 5, 6, 7])); // [1, 2, 4, 5, 7]
