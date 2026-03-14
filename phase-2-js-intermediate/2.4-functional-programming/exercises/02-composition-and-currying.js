// Exercise 2: Composition, Currying & Partial Application
// --------------------------------------------------------

// 2a. Implement pipe(fn1, fn2, ...) — left to right composition
function pipe(...fns) {
  // YOUR CODE HERE
}

// 2b. Implement compose(fn1, fn2, ...) — right to left composition
function compose(...fns) {
  // YOUR CODE HERE
}

// 2c. Curry a two-argument function
function curry(fn) {
  // YOUR CODE HERE
}

// 2d. Use pipe to build a text processing pipeline:
// trim whitespace -> lowercase -> replace spaces with dashes -> append ".html"
function slugify(text) {
  // Use pipe with the above steps as separate functions
  // YOUR CODE HERE
}

// Tests
const double = x => x * 2;
const addOne = x => x + 1;
const square = x => x * x;

const pipeline = pipe(double, addOne, square);
console.log(pipeline(3)); // (3*2+1)^2 = 49

const composed = compose(square, addOne, double);
console.log(composed(3)); // same result: 49

const add = curry((a, b) => a + b);
const add5 = add(5);
console.log(add5(3));  // 8
console.log(add5(10)); // 15

console.log(slugify("  Hello World  ")); // "hello-world.html"
