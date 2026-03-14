// Exercise 2: Destructuring & Spreading
// --------------------------------------

// 2a. Destructure the first and second elements from the array
function firstAndSecond(arr) {
  // Return { first, second }
  // YOUR CODE HERE
}

// 2b. Destructure name and age from person, with age defaulting to 0
function getPersonInfo(person) {
  // Return a formatted string: "Alice (30)"
  // YOUR CODE HERE
}

// 2c. Swap two variables using destructuring (no temp variable)
function swap(a, b) {
  // Return [b, a] using array destructuring assignment
  // YOUR CODE HERE
}

// 2d. Merge two objects, with obj2 values overriding obj1
function merge(obj1, obj2) {
  // YOUR CODE HERE
}

// 2e. Add a property to an object without mutating it
function addProperty(obj, key, value) {
  // YOUR CODE HERE
}

// Tests
console.log(firstAndSecond([10, 20, 30]));       // { first: 10, second: 20 }
console.log(getPersonInfo({ name: "Alice", age: 30 })); // "Alice (30)"
console.log(getPersonInfo({ name: "Bob" }));      // "Bob (0)"
console.log(swap(1, 2));                           // [2, 1]
const merged = merge({ a: 1, b: 2 }, { b: 99, c: 3 });
console.log(merged);                               // { a: 1, b: 99, c: 3 }
const obj = { x: 1 };
const extended = addProperty(obj, "y", 2);
console.log(extended);  // { x: 1, y: 2 }
console.log(obj);       // { x: 1 } — unchanged
