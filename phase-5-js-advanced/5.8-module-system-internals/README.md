# 5.8 Module System Internals

## ESM Live Bindings

In ES Modules, named exports are **live bindings** — not value copies. When the exporting module updates a value, all importers see the new value immediately.

```js
// counter.mjs
export let count = 0;
export function increment() { count++; }

// main.mjs
import { count, increment } from "./counter.mjs";
console.log(count); // 0
increment();
console.log(count); // 1 — live binding! value updated
```

This is the opposite of CommonJS, where you get a snapshot of the value at require time:
```js
// counter.js (CJS)
let count = 0;
module.exports = { count, increment: () => count++ };

// main.js
const { count, increment } = require("./counter");
console.log(count); // 0
increment();
console.log(count); // still 0 — CJS copies the value
```

## Circular Imports

### CommonJS — synchronous, partial exports visible
```js
// a.js
const b = require("./b");
console.log("a: b.value =", b.value);
module.exports = { value: "A" };

// b.js
const a = require("./a");
console.log("b: a.value =", a.value); // undefined! a not fully loaded yet
module.exports = { value: "B" };
```

### ESM — live bindings, but value may be `undefined` at first evaluation
```js
// ESM handles cycles via live bindings — the binding exists but may not be initialized yet
// Functions work fine in cycles (hoisted), variables may be TDZ
```

**Rule:** Avoid circular imports. When unavoidable, structure so that the cycle is broken by using functions (called after initialization) rather than top-level values.

## CJS vs ESM Key Differences

| Feature | CommonJS | ES Modules |
|---|---|---|
| Loading | Synchronous | Asynchronous |
| Exports | Value snapshot | Live bindings |
| `this` at top level | `module.exports` | `undefined` |
| `__dirname` / `__filename` | Available | Not available (use `import.meta.url`) |
| Dynamic | `require()` anywhere | `await import()` |
| Tree-shaking | Not possible | Possible (static analysis) |
| Interop | `require()` of ESM: not supported | `import` of CJS: default import only |

## `import.meta`

```js
// import.meta.url — absolute URL of current module
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);

// import.meta.resolve — resolve a module specifier
const path = await import.meta.resolve("./utils.js");

// import.meta.env (Vite, Bun)
// import.meta.env.DEV, import.meta.env.PROD
```

## Dynamic import()

```js
// Load a module only when needed — returns a Promise
const module = await import("./heavy.js");

// Conditional loading
if (process.env.NODE_ENV === "development") {
  const { devTools } = await import("./dev-tools.js");
}

// import() always returns a module namespace object
const { default: MyClass, helper } = await import("./module.js");
```

## Resources
- [javascript.info: Modules](https://javascript.info/modules)
- [Node.js: ESM vs CJS](https://nodejs.org/api/esm.html)
- [MDN: import.meta](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import.meta)

## Exercises
Go to the [exercises](./exercises/) folder.

> **Note:** Exercise files use the `.cjs` extension because the root `package.json` sets `"type": "module"`.
> CJS-specific globals (`require`, `__filename`, `__dirname`) are only available in `.cjs` files.
> Run with: `node exercises/01-module-concepts.cjs`
