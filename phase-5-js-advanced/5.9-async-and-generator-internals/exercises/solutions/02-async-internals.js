// Task 1: asyncRun — manual async/await via generators
function asyncRun(generatorFn) {
  return new Promise((resolve, reject) => {
    const gen = generatorFn();
    function step(method, value) {
      let result;
      try { result = gen[method](value); }
      catch (err) { reject(err); return; }
      if (result.done) { resolve(result.value); return; }
      Promise.resolve(result.value).then(
        val => step("next", val),
        err => step("throw", err)
      );
    }
    step("next", undefined);
  });
}

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

asyncRun(function* () {
  console.log("asyncRun: start");
  yield delay(50);
  console.log("asyncRun: after 50ms");
  yield delay(50);
  console.log("asyncRun: after 100ms");
  return "done";
}).then(result => console.log("asyncRun result:", result));

// Task 2: microQueue — microtask vs macrotask ordering
function microQueue() {
  console.log("sync");
  setTimeout(() => console.log("macrotask"), 0);
  Promise.resolve()
    .then(() => console.log("microtask 1"))
    .then(() => console.log("microtask 2"));
  // Output order: sync → microtask 1 → microtask 2 → macrotask
  // Microtasks (Promise queue) always drain before the next macrotask fires.
}

microQueue();

// Task 3: promiseChain — sequential reduce-based promise chain
function promiseChain(value, fns) {
  return fns.reduce((acc, fn) => acc.then(v => fn(v)), Promise.resolve(value));
}

promiseChain(1, [
  x => Promise.resolve(x + 1),
  x => Promise.resolve(x * 10),
  x => Promise.resolve(x - 5),
]).then(result => console.log("promiseChain result:", result)); // 15

// Task 4: return bar() vs return await bar()
function bar() {
  return Promise.reject(new Error("bar failed"));
}

// Without await: the try/catch does NOT catch the rejection because
// `return bar()` exits the async function before the Promise rejects.
// The rejection propagates to the caller's Promise chain, not to the
// catch block inside safeWithoutAwait.
async function safeWithoutAwait() {
  try {
    return bar(); // returns a rejected Promise — catch does not run
  } catch (e) {
    return "caught: " + e.message;
  }
}

// With await: the async function suspends at the await point and the
// rejection is thrown back into the function body, where catch CAN run.
async function safeWithAwait() {
  try {
    return await bar(); // rejection is thrown into this frame — catch runs
  } catch (e) {
    return "caught: " + e.message;
  }
}

safeWithoutAwait()
  .then(v  => console.log("withoutAwait resolved:", v))
  .catch(e => console.log("withoutAwait rejected:", e.message));
// → withoutAwait rejected: bar failed   (catch inside fn did NOT run)

safeWithAwait()
  .then(v  => console.log("withAwait resolved:", v))
  .catch(e => console.log("withAwait rejected:", e.message));
// → withAwait resolved: caught: bar failed   (catch inside fn DID run)
