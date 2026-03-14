# 5.5 Modern Language Features

## Concepts

### WeakRef & FinalizationRegistry
```js
// WeakRef — holds a weak reference (doesn't prevent GC)
let obj = { name: "Alice" };
const ref = new WeakRef(obj);

obj = null; // obj can now be GC'd

const value = ref.deref(); // undefined if collected, obj if still alive
if (value) console.log(value.name);

// FinalizationRegistry — run a callback when an object is collected
const registry = new FinalizationRegistry((heldValue) => {
  console.log(`${heldValue} was garbage collected`);
});

let target = { data: "big" };
registry.register(target, "target object");
target = null; // eventually triggers the callback
```

> Use case: cache that doesn't prevent GC of its values.

### Error Cause & AggregateError
```js
// Error cause — chain errors without losing original context
try {
  await fetchUser(id);
} catch (err) {
  throw new Error("Failed to load user profile", { cause: err });
}

// Access the cause
catch (err) {
  console.log(err.cause); // original error
}

// AggregateError — multiple errors in one (used by Promise.any)
const errors = [new Error("a"), new Error("b")];
throw new AggregateError(errors, "Multiple things failed");

try { await Promise.any([p1, p2]); }
catch (err) {
  console.log(err.errors); // [error1, error2]
}
```

### Logical Assignment Operators
```js
// &&= — assign only if left side is truthy
user.name &&= user.name.trim();
// equivalent to: user.name = user.name && user.name.trim()

// ||= — assign only if left side is falsy
config.timeout ||= 3000;
// equivalent to: config.timeout = config.timeout || 3000

// ??= — assign only if left side is null or undefined
config.retries ??= 3;
// equivalent to: config.retries = config.retries ?? 3
```

### structuredClone()
Deep clone any cloneable value (same algorithm as `postMessage`):
```js
const clone = structuredClone({ a: 1, nested: { b: [1, 2, 3] } });
// Handles: Date, Map, Set, ArrayBuffer, RegExp, Error, circular refs
// Does NOT clone: functions, DOM nodes, class methods
```

### Advanced Regular Expressions
```js
// Named capture groups
const re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
const { year, month, day } = "2024-03-15".match(re).groups;

// Lookbehind
/(?<=\$)\d+/.exec("$100"); // matches "100" (preceded by $)

// Lookahead
/\d+(?= dollars)/.exec("100 dollars"); // "100"
// Negative: /\d+(?! dollars)/

// matchAll — get all matches with capture groups
const matches = [...str.matchAll(/(\w+)/g)];

// `d` flag — indices of each match
const result = /hello/d.exec("say hello");
result.indices[0]; // [4, 9]
```

### Object.hasOwn()
Safer replacement for `hasOwnProperty`:
```js
// Old (can be overridden, fails on Object.create(null))
obj.hasOwnProperty("key");

// New (safe)
Object.hasOwn(obj, "key");
```

## Resources
- [MDN: WeakRef](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakRef)
- [MDN: Error cause](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause)
- [MDN: AggregateError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AggregateError)
- [MDN: Logical assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_OR_assignment)
- [MDN: structuredClone](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone)
- [javascript.info: RegExp](https://javascript.info/regular-expressions)

## Exercises
Go to the [exercises](./exercises/) folder.
