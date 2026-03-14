// Solutions: Memory Management

// 3a. Analysis:
// Snippet 1: YES — grows unboundedly. handlers are pushed to `listeners` every second
//   and never removed. Fix: clear the array or don't accumulate handlers.
// Snippet 2: YES — cache object grows without bound. Fix: use a WeakMap,
//   or implement an LRU cache with a size limit, or use a TTL expiry.
// Snippet 3: YES — inner() closes over bigArray entirely, even though it only
//   uses bigArray.length. Fix: capture the length before returning:
//   const len = bigArray.length; bigArray = null; return () => len;

// 3b. Fixed timer
function startTimerFixed() {
  let count = 0;
  const id = setInterval(() => {
    count++;
    console.log("tick", count);
  }, 100);
  return () => clearInterval(id);
}

const stop = startTimerFixed();
setTimeout(stop, 350);

// 3c. WeakMap private data
const privateData = new WeakMap();
class SecureUser {
  constructor(name, secret) {
    privateData.set(this, { secret });
    this.name = name;
  }
  getSecret() { return privateData.get(this).secret; }
}
const user = new SecureUser("Alice", "hunter2");
console.log(user.name);
console.log(user.getSecret());
console.log(user.secret);

// 3d. Non-blocking sum
function blockingSum(n) {
  let sum = 0;
  for (let i = 0; i < n; i++) sum += i;
  return sum;
}

async function nonBlockingSum(n, chunkSize = 1_000_000) {
  let sum = 0;
  for (let i = 0; i < n; i += chunkSize) {
    const end = Math.min(i + chunkSize, n);
    for (let j = i; j < end; j++) sum += j;
    await new Promise(resolve => setTimeout(resolve, 0)); // yield to event loop
  }
  return sum;
}

console.time("blocking");
blockingSum(100_000_000);
console.timeEnd("blocking");

nonBlockingSum(100_000_000).then(sum => console.log("non-blocking sum:", sum));
console.log("Event loop not blocked — this logs immediately after nonBlockingSum starts");
