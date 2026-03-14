// Exercise 1: Array Methods
// --------------------------

const people = [
  { name: "Alice", age: 30, city: "Hanoi" },
  { name: "Bob", age: 17, city: "HCMC" },
  { name: "Charlie", age: 25, city: "Hanoi" },
  { name: "Diana", age: 15, city: "Danang" },
];

// 1a. Get names of all adults (age >= 18)
function adultNames(people) {
  // Use filter + map
  // YOUR CODE HERE
}

// 1b. Get the total age of all people
function totalAge(people) {
  // Use reduce
  // YOUR CODE HERE
}

// 1c. Find the first person from Hanoi
function firstFromHanoi(people) {
  // Use find
  // YOUR CODE HERE
}

// 1d. Check if everyone is older than 10
function allOlderThan10(people) {
  // Use every
  // YOUR CODE HERE
}

// 1e. Check if anyone is under 18
function anyMinor(people) {
  // Use some
  // YOUR CODE HERE
}

// 1f. Return people sorted by age ascending
function sortByAge(people) {
  // Don't mutate the original array
  // YOUR CODE HERE
}

// 1g. Return a flat list of all cities (with duplicates)
const data = [["Hanoi", "HCMC"], ["Danang", "Hanoi"]];
function flatCities(data) {
  // Use flat() or flatMap()
  // YOUR CODE HERE
}

// Tests
console.log(adultNames(people));     // ["Alice", "Charlie"]
console.log(totalAge(people));       // 87
console.log(firstFromHanoi(people)); // { name: "Alice", ... }
console.log(allOlderThan10(people)); // true
console.log(anyMinor(people));       // true
console.log(sortByAge(people).map(p => p.name)); // ["Diana", "Bob", "Charlie", "Alice"]
console.log(flatCities(data));       // ["Hanoi", "HCMC", "Danang", "Hanoi"]
