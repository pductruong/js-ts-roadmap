# 2.4 Functional Programming

## Concepts

### Pure Functions
Same input always produces same output. No side effects.
```js
// Pure
const add = (a, b) => a + b;

// Impure — reads external state
let tax = 0.1;
const price = (amount) => amount * (1 + tax);
```

### Immutability
Don't mutate data — create new copies.
```js
// Bad
arr.push(4);

// Good
const newArr = [...arr, 4];
const newObj = { ...obj, key: "newValue" };
```

### Function Composition
Combine functions where the output of one becomes the input of the next.
```js
const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);
const pipe    = (...fns) => x => fns.reduce((v, f) => f(v), x);

const double = x => x * 2;
const addOne = x => x + 1;

const doubleThenAdd = pipe(double, addOne);
doubleThenAdd(5); // 11
```

### Currying
Transform a multi-argument function into a chain of single-argument functions.
```js
const add = a => b => a + b;
const add5 = add(5);
add5(3); // 8
add5(10); // 15
```

### Partial Application
Pre-fill some arguments of a function.
```js
function partial(fn, ...presetArgs) {
  return (...laterArgs) => fn(...presetArgs, ...laterArgs);
}
const double = partial((factor, n) => factor * n, 2);
double(5); // 10
```

### Memoization
Cache results for repeated inputs.
```js
function memoize(fn) {
  const cache = new Map();
  return (arg) => {
    if (!cache.has(arg)) cache.set(arg, fn(arg));
    return cache.get(arg);
  };
}
```

## Resources
- [javascript.info: Currying](https://javascript.info/currying-partials)
- [MDN: Array.reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)

## Exercises
Go to the [exercises](./exercises/) folder.
