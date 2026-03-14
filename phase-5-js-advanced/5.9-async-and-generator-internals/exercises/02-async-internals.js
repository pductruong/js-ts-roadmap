// Exercise 2: Async/Await & Promise Internals
// --------------------------------------------

// --------------------------------------------------------------------------
// Task 1: asyncRun(generatorFn) — manual desugaring of async/await
// --------------------------------------------------------------------------
// Before native async/await, libraries like co.js ran generators whose
// yield points were Promises. The runner called .next() with each resolved
// value so the generator could continue as if it were synchronous.
//
// Implement asyncRun so that this works:
//
//   asyncRun(function* () {
//     const x = yield Promise.resolve(1);
//     const y = yield Promise.resolve(2);
//     return x + y;
//   }).then(console.log); // 3

function asyncRun(generatorFn) {
  // TODO:
  // 1. Create a new Promise (resolve, reject)
  // 2. Call generatorFn() to get the generator object
  // 3. Write a `step(method, value)` helper that:
  //    a. calls gen[method](value) inside try/catch; on catch → reject
  //    b. if result.done → resolve(result.value)
  //    c. otherwise → Promise.resolve(result.value).then(val => step('next', val),
  //                                                      err => step('throw', err))
  // 4. Kick off with step('next', undefined)
}

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

// Test — uncomment after implementing asyncRun:
// asyncRun(function* () {
//   console.log("asyncRun: start");
//   yield delay(50);
//   console.log("asyncRun: after 50ms");
//   yield delay(50);
//   console.log("asyncRun: after 100ms");
//   return "done";
// }).then(result => console.log("asyncRun result:", result));

// --------------------------------------------------------------------------
// Task 2: microQueue() — demonstrate microtask vs macrotask ordering
// --------------------------------------------------------------------------
// Microtasks (Promise callbacks) always run before the next macrotask
// (setTimeout callbacks), even a setTimeout(fn, 0).
//
// Write a function microQueue() that:
//   - logs "sync"
//   - schedules a setTimeout(() => console.log("macrotask"), 0)
//   - schedules Promise.resolve().then(() => console.log("microtask 1"))
//              .then(() => console.log("microtask 2"))
//   - then show what order the lines print and why

function microQueue() {
  // TODO: implement as described above.
  // Expected output order: sync → microtask 1 → microtask 2 → macrotask
}

microQueue();

// --------------------------------------------------------------------------
// Task 3: promiseChain(value, fns) — sequential promise chain with reduce
// --------------------------------------------------------------------------
// Given an initial value and an array of functions that each return a Promise,
// thread the value through them one at a time (output of one feeds next).
//
// Example:
//   promiseChain(1, [
//     x => Promise.resolve(x + 1),   // 2
//     x => Promise.resolve(x * 10),  // 20
//     x => Promise.resolve(x - 5),   // 15
//   ]).then(console.log); // 15

function promiseChain(value, fns) {
  // TODO: use Array.prototype.reduce to build a Promise chain.
  // Start with Promise.resolve(value) as the accumulator.
  // Each step: acc.then(v => fn(v))
}

promiseChain(1, [
  x => Promise.resolve(x + 1),
  x => Promise.resolve(x * 10),
  x => Promise.resolve(x - 5),
]).then(result => console.log("promiseChain result:", result)); // 15

// --------------------------------------------------------------------------
// Task 4: return bar() vs return await bar() — error propagation difference
// --------------------------------------------------------------------------
// When bar() throws (or returns a rejected Promise), there is a subtle but
// important difference between these two async functions:
//
//   async function withoutAwait() { return bar(); }
//   async function withAwait()    { return await bar(); }
//
// The difference shows up when bar() rejects:
//   - withoutAwait: the rejection propagates through the returned Promise,
//     but the async function's OWN stack frame is already gone — no try/catch
//     inside withoutAwait can catch it.
//   - withAwait: the rejection is caught at the await point INSIDE the async
//     function, so a try/catch there WILL catch it (and the stack trace
//     includes withAwait's frame in some engines).
//
// TODO: write both versions, wrap each in a try/catch, and observe the
//       difference. Use a function bar() that returns a rejected promise.

function bar() {
  return Promise.reject(new Error("bar failed"));
}

// TODO: implement safeWithoutAwait and safeWithAwait, each wrapping
//       a call to bar() in try/catch, then call both and log results.

async function safeWithoutAwait() {
  // TODO: try { return bar(); } catch (e) { return "caught: " + e.message; }
  // Does the catch run? Why not?
}

async function safeWithAwait() {
  // TODO: try { return await bar(); } catch (e) { return "caught: " + e.message; }
  // Does the catch run? Why?
}

// TODO: call both and log their results. Expected:
// safeWithoutAwait → rejects (catch did NOT run — bar() rejection bypasses it)
// safeWithAwait    → resolves to "caught: bar failed" (catch DID run)
//
// Uncomment after implementing:
// safeWithoutAwait()
//   .then(v  => console.log("withoutAwait resolved:", v))
//   .catch(e => console.log("withoutAwait rejected:", e.message));
// safeWithAwait()
//   .then(v  => console.log("withAwait resolved:", v))
//   .catch(e => console.log("withAwait rejected:", e.message));
