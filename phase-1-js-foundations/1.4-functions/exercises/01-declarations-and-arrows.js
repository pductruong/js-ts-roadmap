// Exercise 1: Declarations & Arrow Functions
// -------------------------------------------

// 1a. Write the same function in 3 ways: declaration, expression, arrow
// It should take two numbers and return their sum.

// Declaration
function addDeclaration(a, b) {
  // YOUR CODE HERE
}

// Expression
const addExpression = function(a, b) {
  // YOUR CODE HERE
};

// Arrow
const addArrow = (a, b) => {
  // YOUR CODE HERE
};

// Arrow (one-liner)
const addArrowShort = // YOUR CODE HERE

// 1b. Write an arrow function that takes a name and returns a greeting string
const greet = // YOUR CODE HERE

// 1c. Write an arrow function that returns an object { doubled: n * 2 }
// (Remember: wrap object literal in parentheses!)
const double = // YOUR CODE HERE

// Tests
console.log(addDeclaration(2, 3));  // 5
console.log(addExpression(2, 3));   // 5
console.log(addArrow(2, 3));        // 5
console.log(addArrowShort(2, 3));   // 5
console.log(greet("Alice"));        // "Hello, Alice"
console.log(double(5));             // { doubled: 10 }
