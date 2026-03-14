# 5.4 Worker Threads & Concurrency

## Concepts

JavaScript is single-threaded, but Node.js provides **Worker Threads** to run CPU-heavy work in parallel without blocking the event loop.

### When to use Worker Threads
- CPU-bound work: image processing, crypto, compression, heavy computation
- **Not** for I/O-bound work — async/await already handles that efficiently

### Worker Threads (Node.js)
```js
// main.js
import { Worker } from "worker_threads";

const worker = new Worker("./worker.js", {
  workerData: { input: [1, 2, 3, 4, 5] }
});

worker.on("message", result => console.log("Result:", result));
worker.on("error", err => console.error("Error:", err));
worker.on("exit", code => console.log("Worker exited with code", code));
```

```js
// worker.js
import { workerData, parentPort } from "worker_threads";

const result = workerData.input.reduce((a, b) => a + b, 0);
parentPort.postMessage(result);
```

### SharedArrayBuffer & Atomics
Share memory between threads without copying. Use `Atomics` for safe concurrent access.

```js
// Shared memory
const shared = new SharedArrayBuffer(4); // 4 bytes
const view = new Int32Array(shared);

// Atomic operations (thread-safe)
Atomics.add(view, 0, 1);     // view[0] += 1 atomically
Atomics.load(view, 0);       // read atomically
Atomics.store(view, 0, 42);  // write atomically
Atomics.compareExchange(view, 0, expected, replacement);

// Blocking wait (workers only, not main thread)
Atomics.wait(view, 0, 0);  // sleep until view[0] != 0
Atomics.notify(view, 0);   // wake waiting threads
```

### MessageChannel
Two-way communication channel between any two contexts.

```js
const { port1, port2 } = new MessageChannel();
port1.on("message", msg => console.log("port1 received:", msg));
port2.postMessage("hello");
```

### Structured Clone Algorithm
Data sent between threads is **deep copied** via structured clone. Functions and prototypes are NOT cloned.

Cloneable: plain objects, arrays, Map, Set, Date, RegExp, ArrayBuffer, TypedArrays, Error
NOT cloneable: functions, DOM nodes, class instances with methods (methods are lost)

```js
// Transfer ownership instead of copying (zero-copy for ArrayBuffers)
worker.postMessage({ buffer }, [buffer]); // buffer transferred, not copied
```

## Resources
- [Node.js: Worker Threads](https://nodejs.org/api/worker_threads.html)
- [MDN: SharedArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer)
- [MDN: Atomics](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Atomics)
- [MDN: Structured clone algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm)

## Exercises
Go to the [exercises](./exercises/) folder.
