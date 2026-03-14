// Exercise 2: `using` declarations — Explicit Resource Management
// ---------------------------------------------------------------
// Note: requires Node 18+ and TS 5.2+. tsx handles this automatically.

// 2a. Implement a disposable resource
class Timer {
  private startTime = Date.now();
  private label: string;

  constructor(label: string) {
    this.label = label;
    console.log(`[${label}] started`);
  }

  [Symbol.dispose]() {
    const elapsed = Date.now() - this.startTime;
    console.log(`[${this.label}] ended — ${elapsed}ms elapsed`);
  }
}

// 2b. Use `using` to auto-dispose
function doWork() {
  using timer = new Timer("doWork");
  // ... do work ...
  let sum = 0;
  for (let i = 0; i < 1_000_000; i++) sum += i;
  console.log("Sum:", sum);
  // timer[Symbol.dispose]() called automatically here
}

doWork();
// Output:
// [doWork] started
// Sum: 499999500000
// [doWork] ended — Nms elapsed

// 2c. Disposable works even when an error is thrown
function withError() {
  using timer = new Timer("withError");
  throw new Error("Something went wrong");
  // timer is still disposed before the error propagates
}

try { withError(); }
catch (e: any) { console.log("Caught:", e.message); }
// [withError] started
// [withError] ended — Nms elapsed
// Caught: Something went wrong

// 2d. Build your own using-style helper (for environments without `using` support)
// This mimics the behavior using a regular function
function withResource<T extends { dispose(): void }, R>(
  resource: T,
  fn: (r: T) => R
): R {
  try {
    return fn(resource);
  } finally {
    resource.dispose();
  }
}

class SimpleConnection {
  constructor(public url: string) { console.log(`Connected to ${url}`); }
  query(sql: string) { return `results for: ${sql}`; }
  dispose() { console.log(`Disconnected from ${this.url}`); }
}

const result = withResource(
  new SimpleConnection("db://localhost"),
  conn => conn.query("SELECT * FROM users")
);
console.log(result);
