# 5.1 Proxy & Reflect

## Concepts

### Proxy
A `Proxy` wraps an object and intercepts fundamental operations via **traps**.

```js
const proxy = new Proxy(target, handler);
```

Common traps:
| Trap | Intercepted operation |
|---|---|
| `get(target, key, receiver)` | `obj.key` |
| `set(target, key, value, receiver)` | `obj.key = value` |
| `has(target, key)` | `key in obj` |
| `deleteProperty(target, key)` | `delete obj.key` |
| `apply(target, thisArg, args)` | `fn(...args)` |
| `construct(target, args)` | `new Fn(...args)` |
| `ownKeys(target)` | `Object.keys(obj)` |

```js
const handler = {
  get(target, key, receiver) {
    console.log(`Getting ${key}`);
    return Reflect.get(target, key, receiver); // forward to target
  },
  set(target, key, value, receiver) {
    console.log(`Setting ${key} = ${value}`);
    return Reflect.set(target, key, value, receiver);
  },
};

const obj = new Proxy({}, handler);
obj.name = "Alice"; // logs: Setting name = Alice
obj.name;           // logs: Getting name
```

### Reflect
`Reflect` provides the default behavior for each trap. Always use it inside traps instead of operating on `target` directly — it correctly handles edge cases like inheritance and receiver binding.

```js
Reflect.get(target, key, receiver)
Reflect.set(target, key, value, receiver)
Reflect.has(target, key)
Reflect.deleteProperty(target, key)
Reflect.ownKeys(target)
Reflect.apply(target, thisArg, args)
Reflect.construct(target, args)
```

### Real-world use cases
- **Validation** — intercept `set` to validate values
- **Reactivity** — Vue 3's `reactive()` is built on Proxy
- **Default values** — return fallback when property is missing
- **Read-only objects** — throw on `set`
- **Logging / Tracing** — intercept all property access
- **Mocking** in tests — intercept method calls

## Resources
- [javascript.info: Proxy and Reflect](https://javascript.info/proxy)
- [MDN: Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
- [MDN: Reflect](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect)

## Exercises
Go to the [exercises](./exercises/) folder.
