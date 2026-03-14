class Timer {
  private startTime = Date.now();
  constructor(private label: string) { console.log(`[${label}] started`); }
  [Symbol.dispose]() {
    console.log(`[${this.label}] ended — ${Date.now() - this.startTime}ms elapsed`);
  }
}

function doWork() {
  using timer = new Timer("doWork");
  let sum = 0;
  for (let i = 0; i < 1_000_000; i++) sum += i;
  console.log("Sum:", sum);
}
doWork();

function withError() {
  using _timer = new Timer("withError");
  throw new Error("Something went wrong");
}
try { withError(); } catch (e: any) { console.log("Caught:", e.message); }

function withResource<T extends { dispose(): void }, R>(resource: T, fn: (r: T) => R): R {
  try { return fn(resource); } finally { resource.dispose(); }
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
