# 5.10 Runtime and Environment Internals

For senior and principal engineers who need to understand how JavaScript engines work at the boundary between code and runtime.

---

## Realms

A **realm** is a distinct execution context with its own set of built-in objects. Every global environment — a browser window, an iframe, a worker, a Node.js vm context — is a separate realm.

Each realm has its own intrinsics:

- Its own `Array` constructor
- Its own `Object` constructor
- Its own `Error`, `Map`, `Promise`, etc.

### Cross-realm instanceof fails

`instanceof` checks the prototype chain against the constructor found in the *current* realm. An array created in a different realm has a different `Array.prototype` in its chain.

```js
// In an iframe:
const arr = frames[0].Array(1, 2, 3);

arr instanceof Array;        // false — different realm's Array
Array.isArray(arr);          // true  — Array.isArray is realm-agnostic
Object.prototype.toString.call(arr); // "[object Array]" — also works
```

`Array.isArray` is specified to pierce realm boundaries. `Object.prototype.toString` reads the internal `[[Symbol.toStringTag]]` slot, which is also realm-independent.

### Why it matters

- Libraries that receive values from untrusted or sandboxed contexts cannot rely on `instanceof` for type checks.
- Deep equality functions, serializers, and validators must use `Array.isArray` or `toString` based checks.
- Node.js `vm.runInNewContext` creates a new realm — the same cross-realm issue applies.

---

## ShadowRealm API

ShadowRealm (TC39 proposal, Stage 3 as of 2024) provides a programmatic way to create an isolated realm from within JavaScript, without requiring iframes or Node vm.

```js
const realm = new ShadowRealm();

// evaluateHandle runs code in the realm, returns a callable wrapping
const fn = realm.importValue('./module.js', 'exportedFn');

// evaluate runs an expression string in the realm
const result = realm.evaluate('1 + 1'); // 2
```

### Key properties

| Property | Detail |
|---|---|
| Isolation | Each ShadowRealm has its own global, own built-ins, own module graph |
| Communication | Only primitives and callables can cross the boundary — no object references |
| Module support | `importValue` loads an ES module inside the realm |
| No DOM access | The realm does not inherit the host's Web APIs |

### Use cases

- Plugin sandboxing: run third-party code without access to your global state
- Test isolation: each test suite in its own realm
- Safe formula evaluation: spreadsheet/expression engines

### Current status

Browser support is limited as of early 2025. Polyfills exist but are imperfect because true realm isolation requires engine support. Check [tc39/proposal-shadowrealm](https://github.com/tc39/proposal-shadowrealm) for current status.

---

## eval() and new Function()

Both allow dynamic code execution. Both are powerful and dangerous.

### eval()

```js
const x = 10;
eval('x + 5'); // 15 — has access to the surrounding scope (direct eval)
```

Direct `eval` runs in the calling scope and can read and write local variables. This prevents engines from optimizing the enclosing function because any local variable might be accessed by name at runtime.

Indirect eval runs in global scope:

```js
const indirect = eval;
indirect('typeof x'); // "undefined" — no local scope access
```

### new Function()

```js
const add = new Function('a', 'b', 'return a + b');
add(2, 3); // 5
```

`new Function` always runs in global scope, never in the caller's local scope. The last argument is the function body; preceding arguments are parameter names.

```js
// Passing context explicitly
const fn = new Function('ctx', 'return ctx.x + ctx.y');
fn({ x: 3, y: 4 }); // 7
```

### Comparison

| | `eval` (direct) | `eval` (indirect) | `new Function` |
|---|---|---|---|
| Scope access | Local + global | Global only | Global only |
| Engine optimization | Breaks local opts | Minor impact | Minor impact |
| CSP blocked | Yes | Yes | Yes |
| Use case | Almost never | Avoid | Sandboxed eval |

### Risks

- Content Security Policy (CSP) with `script-src 'none'` or without `'unsafe-eval'` blocks all three.
- User-supplied code can exfiltrate global state, call `fetch`, modify the DOM.
- Even with `new Function`, code runs in the page's global scope and can access `window`.

### Legitimate use cases

- Template engines that compile templates to functions at build time
- REPL environments (browser devtools, online playgrounds)
- Rule engines where business logic is stored as strings
- JSON-like expression evaluators with restricted syntax

---

## Error Stack Traces

### Error.stack

`Error.stack` is not standardized — the format is engine-defined. V8 (Node.js, Chrome) produces:

```
Error: something went wrong
    at inner (file.js:10:5)
    at outer (file.js:20:3)
    at Object.<anonymous> (file.js:30:1)
```

Each frame line follows the pattern:
```
    at <functionName> (<fileName>:<line>:<column>)
```

Anonymous functions appear as `at <anonymous>`. Arrow functions use the enclosing function name or `<anonymous>`.

### Parsing stack traces

```js
function parseStack(error) {
  return error.stack
    .split('\n')
    .slice(1)                       // skip the "Error: message" line
    .map(line => line.trim())
    .filter(line => line.startsWith('at '));
}
```

Libraries like `error-stack-parser` or `stacktrace-js` handle cross-engine differences.

### Error.captureStackTrace (V8 only)

V8 exposes `Error.captureStackTrace(target, constructorOpt)` to:

1. Attach a stack trace to any object (not just Error instances)
2. Trim the stack to exclude internal/library frames

```js
class AppError extends Error {
  constructor(message) {
    super(message);
    // Removes AppError constructor from the stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }
  }
}
```

Without this, `new AppError('msg').stack` would show the `AppError` constructor as the top frame. With it, the top frame is the calling code — which is what users and loggers need.

### Stack trace limits

V8 caps stack traces at 10 frames by default:

```js
Error.stackTraceLimit = 50;   // capture more frames
Error.stackTraceLimit = Infinity; // capture all (expensive)
```

### prepareStackTrace (V8)

For structured access to stack frames:

```js
Error.prepareStackTrace = (error, structuredStackTrace) => {
  return structuredStackTrace.map(frame => ({
    fn: frame.getFunctionName(),
    file: frame.getFileName(),
    line: frame.getLineNumber(),
    col: frame.getColumnNumber(),
  }));
};

const e = new Error('test');
console.log(e.stack); // now returns the structured array
```

This is used by source-map support libraries to rewrite compiled stack traces back to original TypeScript/JSX locations.

---

## Tail Call Optimization (TCO)

### What is a tail call?

A tail call is a function call that is the last operation in a function — nothing is done with the return value except return it.

```js
// Tail call — the return value of bar() is immediately returned
function foo() {
  return bar(); // tail call
}

// Not a tail call — the result is used in an expression
function foo() {
  return bar() + 1; // not a tail call
}
```

### Proper Tail Calls in ES2015

The ES2015 specification mandates Proper Tail Calls (PTC) in strict mode. When a tail call is detected, the engine should reuse the current stack frame instead of allocating a new one, allowing infinite recursion without stack overflow.

```js
'use strict';

function factorial(n, acc = 1) {
  if (n <= 1) return acc;
  return factorial(n - 1, n * acc); // proper tail call
}

factorial(100000); // would not overflow if PTC were implemented
```

### Why engines don't implement it

As of 2025, only JavaScriptCore (Safari) implements PTC. V8 implemented it experimentally and then removed it. The reasons:

**Debugging becomes worse.** Reusing stack frames means those frames disappear from stack traces. You cannot tell how deep a recursion went. Tooling (profilers, debuggers, crash reporters) loses information.

**Syntax Harmony (SyntaxStack) proposal.** The TC39 working group proposed an explicit `continue` keyword for tail calls as an alternative. It has not been adopted.

**Performance is rarely the bottleneck.** Most real-world recursion is shallow. The cases where TCO matters (tree traversal, state machines) are already written iteratively.

### The practical alternative: trampolining

A trampoline converts tail-recursive functions to iterative ones without engine support:

```js
function trampoline(fn) {
  return function(...args) {
    let result = fn(...args);
    while (typeof result === 'function') {
      result = result();
    }
    return result;
  };
}

function factorial(n, acc = 1) {
  if (n <= 1) return acc;
  return () => factorial(n - 1, n * acc); // return thunk instead of recursing
}

const safeFactorial = trampoline(factorial);
safeFactorial(10000); // works, iterative under the hood
```

### TCO vs iterative — what to write

For production code: write iteratively. Loops are explicit, always optimized, and produce clear stack traces.

For academic or functional-style code: use trampolining if you want the recursive structure without stack risk.

Relying on TCO in V8/Node.js will cause stack overflows.

---

## Key Takeaways

- Use `Array.isArray()` or `Object.prototype.toString.call()` for cross-realm type checks, never `instanceof`.
- ShadowRealm is the standards-track way to create isolated execution contexts; polyfills are imperfect.
- `new Function()` is safer than direct `eval` but still executes in global scope — not a sandbox.
- Use `Error.captureStackTrace(this, Constructor)` to produce clean stack traces in custom error classes.
- Do not rely on TCO in Node.js or browser V8. Use iterative loops or trampolining for deep recursion.
