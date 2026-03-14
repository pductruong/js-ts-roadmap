// Exercise 2: Default, Rest & Spread
// ------------------------------------

// 2a. Greet with a default name of "World"
function greet(name = /* YOUR DEFAULT */) {
  return `Hello, ${name}!`;
}

// 2b. Sum any number of arguments
function sum(/* YOUR REST PARAM */) {
  // YOUR CODE HERE
}

// 2c. Return the largest number from any number of arguments
function max(/* YOUR REST PARAM */) {
  // Hint: Math.max(...args)
  // YOUR CODE HERE
}

// 2d. Merge two objects into one using spread
function mergeObjects(obj1, obj2) {
  // obj2 properties should override obj1
  // YOUR CODE HERE
}

// 2e. Append items to an array without mutating the original
function appendItems(arr, ...items) {
  // Return a new array with items added
  // YOUR CODE HERE
}

// Tests
console.log(greet());           // "Hello, World!"
console.log(greet("Alice"));    // "Hello, Alice!"
console.log(sum(1, 2, 3));      // 6
console.log(sum(1, 2, 3, 4, 5)); // 15
console.log(max(3, 1, 4, 1, 5, 9)); // 9
console.log(mergeObjects({ a: 1 }, { b: 2, a: 99 })); // { a: 99, b: 2 }
const arr = [1, 2, 3];
const newArr = appendItems(arr, 4, 5);
console.log(newArr); // [1, 2, 3, 4, 5]
console.log(arr);    // [1, 2, 3] — original unchanged
