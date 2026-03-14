import { Worker, isMainThread, workerData, parentPort } from "worker_threads";
import { fileURLToPath } from "url";

if (isMainThread) {
  function runFibWorker(n) {
    return new Promise((resolve, reject) => {
      const worker = new Worker(fileURLToPath(import.meta.url), {
        workerData: { task: "fib", n },
      });
      worker.on("message", resolve);
      worker.on("error", reject);
    });
  }

  async function runParallel(inputs) {
    return Promise.all(inputs.map(n => runFibWorker(n)));
  }

  function sharedCounter() {
    const sab = new SharedArrayBuffer(4);
    const counter = new Int32Array(sab);
    console.log("Initial:", Atomics.load(counter, 0));
    Atomics.add(counter, 0, 1);
    Atomics.add(counter, 0, 1);
    Atomics.add(counter, 0, 1);
    console.log("After 3 increments:", Atomics.load(counter, 0));
    const old = Atomics.compareExchange(counter, 0, 3, 10);
    console.log("compareExchange old value:", old);
    console.log("Counter after CAS:", Atomics.load(counter, 0));
  }

  (async () => {
    console.time("sequential");
    const fib = n => n <= 1 ? n : fib(n-1) + fib(n-2);
    const seq = [40, 41, 42].map(n => fib(n));
    console.timeEnd("sequential");
    console.log("Sequential results:", seq);

    console.time("parallel");
    const par = await runParallel([40, 41, 42]);
    console.timeEnd("parallel");
    console.log("Parallel results:", par);

    sharedCounter();
  })();
} else {
  const { task, n } = workerData;
  if (task === "fib") {
    const fib = n => n <= 1 ? n : fib(n-1) + fib(n-2);
    parentPort.postMessage(fib(n));
  }
}
