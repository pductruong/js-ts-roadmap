# 1.5 Arrays & Objects

## Concepts

### Array Methods

```js
const nums = [1, 2, 3, 4, 5];

nums.map(n => n * 2)          // [2, 4, 6, 8, 10] — transform each item
nums.filter(n => n % 2 === 0) // [2, 4]           — keep matching items
nums.reduce((acc, n) => acc + n, 0) // 15         — accumulate to single value
nums.find(n => n > 3)         // 4                — first match
nums.some(n => n > 4)         // true             — any match?
nums.every(n => n > 0)        // true             — all match?
nums.flat()                   // flattens one level
nums.flatMap(n => [n, n * 2]) // map then flatten
[...nums].sort((a, b) => a - b) // sort ascending (always pass comparator)
```

### Destructuring
```js
// Array destructuring
const [first, second, ...rest] = [1, 2, 3, 4, 5];
// first=1, second=2, rest=[3,4,5]

// Object destructuring
const { name, age = 0, ...others } = { name: "Alice", age: 30, city: "Hanoi" };

// Rename on destructure
const { name: userName } = { name: "Alice" };
```

### Spreading
```js
const copy = [...arr];                   // shallow copy
const merged = [...arr1, ...arr2];
const objCopy = { ...obj };
const extended = { ...obj, newKey: 1 };
```

### Object Methods
```js
Object.keys(obj)    // ["a", "b"]
Object.values(obj)  // [1, 2]
Object.entries(obj) // [["a", 1], ["b", 2]]
Object.fromEntries([["a", 1], ["b", 2]]) // { a: 1, b: 2 }
Object.assign({}, obj1, obj2)
```

### Map & Set
```js
// Map — key/value pairs, any type as key
const map = new Map();
map.set("key", 42);
map.get("key"); // 42
map.has("key"); // true

// Set — unique values
const set = new Set([1, 2, 2, 3]); // Set {1, 2, 3}
set.add(4);
set.has(3); // true
[...set]    // [1, 2, 3, 4]
```

## Resources
- [javascript.info: Arrays](https://javascript.info/array)
- [javascript.info: Array methods](https://javascript.info/array-methods)
- [javascript.info: Destructuring](https://javascript.info/destructuring-assignment)
- [javascript.info: Map and Set](https://javascript.info/map-set)
- [MDN: Object static methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

## Exercises
Go to the [exercises](./exercises/) folder.
