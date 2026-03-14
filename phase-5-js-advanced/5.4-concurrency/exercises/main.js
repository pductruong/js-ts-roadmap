// Exercise: Worker Threads
// -------------------------
// Run with: node main.js

import { Worker, isMainThread, workerData, parentPort } from "worker_threads";
import { fileURLToPath } from "url";

// This file acts as both the main thread and the worker thread.
// isMainThread tells us which role we're in.

if (isMainThread) {
  // --- MAIN THREAD ---

  // Exercise 1: Fibonacci in a worker
  // Send a number to the worker, receive the Fibonacci result back.
  function runFibWorker(n) {
    return new Promise((resolve, reject) => {
      const worker = new Worker(fileURLToPath(import.meta.url), {
        workerData: { task: "fib", n },
      });
      worker.on("message", resolve);
      worker.on("error", reject);
    });
  }

  // Exercise 2: Run multiple workers in parallel
  // Compare: sequential vs parallel computation time
  async function runParallel(inputs) {
    // YOUR CODE HERE: run runFibWorker for each input in parallel using Promise.all
    // Return array of results
  }

  // Exercise 3: SharedArrayBuffer counter
  // Increment a shared counter from the main thread using Atomics
  function sharedCounter() {
    const sab = new SharedArrayBuffer(4);
    const counter = new Int32Array(sab);

    console.log("Initial:", Atomics.load(counter, 0)); // 0
    Atomics.add(counter, 0, 1);
    Atomics.add(counter, 0, 1);
    Atomics.add(counter, 0, 1);
    console.log("After 3 increments:", Atomics.load(counter, 0)); // 3

    // YOUR CODE HERE: use Atomics.compareExchange to set counter to 10 only if it's currently 3
    const old = Atomics.compareExchange(counter, 0, /* expected */ 3, /* replacement */ 10);
    console.log("compareExchange old value:", old); // 3
    console.log("Counter after CAS:", Atomics.load(counter, 0)); // 10
  }

  // Run exercises
  (async () => {
    console.time("sequential");
    const seq = [40, 41, 42].map(n => {
      // Naive fib — just for timing demo, not using worker here
      const fib = n => n <= 1 ? n : fib(n-1) + fib(n-2);
      return fib(n);
    });
    console.timeEnd("sequential");
    console.log("Sequential results:", seq);

    console.time("parallel");
    const par = await runParallel([40, 41, 42]);
    console.timeEnd("parallel");
    console.log("Parallel results:", par);

    sharedCounter();
  })();

} else {
  // --- WORKER THREAD ---
  // Handle tasks sent from the main thread

  const { task, n } = workerData;

  if (task === "fib") {
    // YOUR CODE HERE: compute fibonacci(n) and postMessage the result
    // Use a naive recursive implementation (intentionally slow to show parallelism benefit)
    function fib(n) {
      if (n <= 1) return n;
      return fib(n - 1) + fib(n - 2);
    }
    parentPort.postMessage(fib(n));
  }
}
