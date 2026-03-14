# 5.2 Property Descriptors & Symbols

## Concepts

### Property Descriptors
Every object property has a descriptor with metadata controlling its behavior.

**Data descriptor:**
```js
Object.defineProperty(obj, "key", {
  value: 42,
  writable: true,    // can be reassigned
  enumerable: true,  // shows in for...in, Object.keys()
  configurable: true // can be redefined or deleted
});
```

**Accessor descriptor** (get/set):
```js
Object.defineProperty(obj, "fullName", {
  get() { return `${this.first} ${this.last}`; },
  set(val) { [this.first, this.last] = val.split(" "); },
  enumerable: true,
  configurable: true,
});
```

### Inspecting descriptors
```js
Object.getOwnPropertyDescriptor(obj, "key");
Object.getOwnPropertyDescriptors(obj); // all at once
```

### Object locking
```js
Object.freeze(obj);      // no add/change/delete, non-configurable, non-writable
Object.seal(obj);        // no add/delete, but values can change
Object.preventExtensions(obj); // no new properties
```

### Symbols
Symbols are unique, non-string property keys. They never collide.

```js
const id = Symbol("id");
const obj = { [id]: 123 };
obj[id]; // 123 — not accessible by string key

// Symbols are NOT enumerable by default
Object.keys(obj);                      // []
Object.getOwnPropertySymbols(obj);     // [Symbol(id)]
Reflect.ownKeys(obj);                  // [Symbol(id)]
```

### Global Symbol Registry
```js
const s1 = Symbol.for("shared"); // register globally
const s2 = Symbol.for("shared"); // retrieve same symbol
s1 === s2; // true

Symbol.keyFor(s1); // "shared"
```

### Why use Symbols?
- **Collision-free keys** — libraries can add properties without risk
- **"Hidden" metadata** — not visible to normal enumeration
- **Protocol hooks** — via well-known symbols (covered in 5.3)

## Resources
- [javascript.info: Property flags and descriptors](https://javascript.info/property-descriptors)
- [javascript.info: Symbols](https://javascript.info/symbol)
- [MDN: Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

## Exercises
Go to the [exercises](./exercises/) folder.
