# 1.4 Functions

## Concepts

### Declaration vs Expression
```js
// Declaration — hoisted (can be called before definition)
function add(a, b) { return a + b; }

// Expression — not hoisted
const multiply = function(a, b) { return a * b; };

// Arrow function — shortest syntax, no own `this`
const square = (x) => x * x;
const greet = name => `Hello, ${name}`;
const getObj = () => ({ key: "value" }); // wrap object in ()
```

### `this` in arrow vs regular functions
```js
const obj = {
  name: "Alice",
  greetRegular: function() { console.log(this.name); }, // "Alice"
  greetArrow: () => { console.log(this.name); },        // undefined (no own `this`)
};
```

### Default Parameters
```js
function greet(name = "stranger") {
  return `Hello, ${name}`;
}
greet();          // "Hello, stranger"
greet("Alice");   // "Hello, Alice"
```

### Rest Parameters
```js
function sum(...numbers) {
  return numbers.reduce((acc, n) => acc + n, 0);
}
sum(1, 2, 3, 4); // 10
```

### Spread Operator
```js
const nums = [1, 2, 3];
console.log(Math.max(...nums)); // 3

const merged = [...arr1, ...arr2];
const copy = { ...obj, extraKey: "value" };
```

### Closures
A function that remembers variables from the outer scope even after the outer function has returned.
```js
function makeCounter() {
  let count = 0;
  return function() {
    count++;
    return count;
  };
}
const counter = makeCounter();
counter(); // 1
counter(); // 2
counter(); // 3
```

### IIFE (Immediately Invoked Function Expression)
```js
const result = (function() {
  const x = 10;
  return x * 2;
})();
console.log(result); // 20
// x is not accessible here
```

### Higher-Order Functions
Functions that take functions as arguments or return functions.
```js
function applyTwice(fn, value) {
  return fn(fn(value));
}
applyTwice(x => x * 2, 3); // 12
```

## Resources
- [javascript.info: Functions](https://javascript.info/function-basics)
- [javascript.info: Arrow functions](https://javascript.info/arrow-functions-basics)
- [javascript.info: Closures](https://javascript.info/closure)
- [javascript.info: Rest & Spread](https://javascript.info/rest-parameters-spread)

## Exercises
Go to the [exercises](./exercises/) folder.
