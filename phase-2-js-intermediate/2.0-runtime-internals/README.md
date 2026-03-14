# 2.0 JavaScript Runtime Internals

Understanding how JavaScript *actually executes* your code is essential for debugging, writing performant code, and avoiding common pitfalls like memory leaks and stack overflows.

## The Big Picture

```
┌──────────────────────────────────────────────────────────────┐
│                     JavaScript Runtime                       │
│                                                              │
│  ┌─────────────┐    ┌──────────────────────────────────┐    │
│  │  Call Stack │    │           Memory Heap             │    │
│  │             │    │  (objects, closures, functions)   │    │
│  │ [frame 3]   │    │                                   │    │
│  │ [frame 2]   │    │  { user: {...}, arr: [...] }      │    │
│  │ [frame 1]   │    │                                   │    │
│  └──────┬──────┘    └──────────────────────────────────┘    │
│         │                                                    │
│  ┌──────▼─────────────────────────────────────────────┐     │
│  │               Web APIs / Node.js APIs              │     │
│  │   setTimeout, fetch, fs.readFile, setInterval      │     │
│  └──────┬─────────────────────────────────────────────┘     │
│         │                                                    │
│  ┌──────▼───────────┐   ┌────────────────────────────┐      │
│  │   Task Queue     │   │      Microtask Queue        │      │
│  │  (Macrotasks)    │   │  (Promise .then, queueMicro)│      │
│  │  setTimeout cb   │   │                            │      │
│  │  setInterval cb  │   │  Higher priority than tasks │      │
│  └──────┬───────────┘   └──────────────┬─────────────┘      │
│         │                              │                     │
│         └──────────┐  ┌───────────────┘                     │
│                    ▼  ▼                                      │
│              ┌──────────────┐                                │
│              │  Event Loop  │ ◄── checks queues when         │
│              │              │     call stack is empty        │
│              └──────────────┘                                │
└──────────────────────────────────────────────────────────────┘
```

---

## Memory Heap

Where JavaScript allocates memory for objects, arrays, closures, and functions.

- **Primitives** (`string`, `number`, `boolean`) are stored by value (usually on the stack or inlined)
- **Objects, arrays, functions** are allocated in the heap and accessed via references

```js
const user = { name: "Alice" }; // object lives in heap
const alias = user;             // alias points to same heap location
alias.name = "Bob";
console.log(user.name); // "Bob" — same reference
```

### Garbage Collection (GC)
JavaScript uses a **mark-and-sweep** GC. Memory is freed when no references to an object remain.

```js
let obj = { big: new Array(1000000) }; // allocated in heap
obj = null; // reference dropped → eligible for GC
```

### Common Memory Leaks
```js
// 1. Forgotten timers
const id = setInterval(() => doWork(), 1000);
// Fix: clearInterval(id) when done

// 2. Closures holding large objects
function createLeak() {
  const bigData = new Array(1000000).fill("x");
  return () => bigData[0]; // bigData can never be GC'd
}

// 3. Growing arrays/maps never cleared
const cache = new Map();
// Fix: use WeakMap so values are GC'd when keys are gone
const weakCache = new WeakMap();

// 4. Event listeners not removed
element.addEventListener("click", handler);
// Fix: element.removeEventListener("click", handler)
```

---

## Call Stack

The call stack tracks **which function is currently executing** and where to return after it finishes.

Each time you call a function, a **stack frame** (execution context) is pushed. When it returns, it's popped.

```js
function c() { console.trace(); }  // prints the stack
function b() { c(); }
function a() { b(); }
a();
// Stack trace: c → b → a → (anonymous)
```

### Stack Overflow
Occurs when the call stack runs out of space — typically from unbounded recursion.

```js
function infinite() {
  return infinite(); // no base case → RangeError: Maximum call stack size exceeded
}

// Fixed with a base case:
function factorial(n) {
  if (n <= 1) return 1;  // base case
  return n * factorial(n - 1);
}
```

### Execution Context
Each stack frame contains:
- **Variable Environment** — local variables (`var`, `let`, `const`)
- **Scope Chain** — access to outer scopes (closures)
- **`this` binding**

```js
const x = "global";

function outer() {
  const x = "outer";
  function inner() {
    const x = "inner";
    console.log(x); // "inner" — closest scope wins
  }
  inner();
}
outer();
```

---

## Event Loop

JavaScript is **single-threaded** — only one thing runs at a time. The event loop coordinates what runs next when the call stack is empty.

### Execution Order
1. Run all synchronous code (call stack empties)
2. Run **all** microtasks (Promise callbacks, `queueMicrotask`)
3. Render (browser) / I/O callbacks (Node.js)
4. Run **one** macrotask (setTimeout, setInterval, I/O)
5. Repeat from step 2

```js
console.log("1 — sync");

setTimeout(() => console.log("4 — macrotask"), 0);

Promise.resolve()
  .then(() => console.log("2 — microtask 1"))
  .then(() => console.log("3 — microtask 2"));

console.log("5 — sync end");

// Output: 1, 5, 2, 3, 4
```

### Macrotask Queue (Task Queue)
Callbacks from: `setTimeout`, `setInterval`, `setImmediate` (Node), I/O callbacks, UI events

Each iteration of the event loop processes **one macrotask**.

### Microtask Queue
Callbacks from: `Promise.then/catch/finally`, `queueMicrotask`, `MutationObserver`

**All microtasks are drained before the next macrotask runs.**

```js
setTimeout(() => console.log("timeout"), 0);

Promise.resolve()
  .then(() => {
    console.log("promise 1");
    return Promise.resolve();
  })
  .then(() => console.log("promise 2"))
  .then(() => console.log("promise 3"));

// Output: promise 1, promise 2, promise 3, timeout
// All microtasks (promise chain) complete before the macrotask (timeout)
```

### Blocking the Event Loop
Long-running synchronous code blocks the event loop — nothing else can run, including UI updates or handling new requests.

```js
// BAD: blocks for ~1 second
function blockingWork() {
  const start = Date.now();
  while (Date.now() - start < 1000) {} // spin
}

// GOOD: break it up
function nonBlockingWork(items, callback) {
  let i = 0;
  function step() {
    if (i >= items.length) { callback(); return; }
    processItem(items[i++]);
    setTimeout(step, 0); // yield to event loop between items
  }
  step();
}
```

---

## Resources
- [javascript.info: Event loop](https://javascript.info/event-loop)
- [MDN: Concurrency model and Event loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop)
- [Loupe — visualize the event loop](http://latentflip.com/loupe/) <- interactive tool, highly recommended
- [javascript.info: Memory management](https://javascript.info/garbage-collection)
- [Chrome DevTools: Memory panel](https://developer.chrome.com/docs/devtools/memory-problems/)
- [What the heck is the event loop anyway? (Philip Roberts, JSConf EU)](https://www.youtube.com/watch?v=8aGhZQkoFbQ) <- watch this first

## Exercises
Go to the [exercises](./exercises/) folder.
