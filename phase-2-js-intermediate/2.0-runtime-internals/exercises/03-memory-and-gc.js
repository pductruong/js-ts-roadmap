// Exercise 3: Memory Management & Leak Detection
// -----------------------------------------------

// 3a. Identify which of these create memory leaks and explain why.
// Write your answer as comments.

// Snippet 1:
function snippet1() {
  const listeners = [];
  setInterval(() => {
    const handler = () => console.log("tick");
    listeners.push(handler); // problem?
  }, 1000);
}
// Is there a leak? Why?
// YOUR ANSWER:

// Snippet 2:
const cache = {};
function snippet2(key, data) {
  cache[key] = data;
}
// Is there a leak? Why? How would you fix it?
// YOUR ANSWER:

// Snippet 3:
function snippet3() {
  let bigArray = new Array(1_000_000).fill(0);
  return function inner() {
    return bigArray.length; // only needs the length
  };
}
// Is there a leak? How would you fix it?
// YOUR ANSWER:


// 3b. Fix the memory leak in this timer
function startTimer() {
  let count = 0;
  const id = setInterval(() => {
    count++;
    console.log("tick", count);
  }, 100);
  // Missing: return a way to stop it!
}

// Fixed version: return a stop function
function startTimerFixed() {
  let count = 0;
  // YOUR CODE HERE: start interval, return a stop function
}

const stop = startTimerFixed();
setTimeout(stop, 350); // should stop after ~3 ticks


// 3c. WeakMap for private data (doesn't prevent GC)
// Using a regular Map would hold a reference and prevent GC.
// WeakMap keys are weak references — if the object is collected, the entry is removed.

const privateData = new WeakMap();

class SecureUser {
  constructor(name, secret) {
    privateData.set(this, { secret });
    this.name = name;
  }

  getSecret() {
    return privateData.get(this).secret;
  }
}

const user = new SecureUser("Alice", "hunter2");
console.log(user.name);       // "Alice"
console.log(user.getSecret()); // "hunter2"
console.log(user.secret);      // undefined — not on the object


// 3d. Blocking the event loop — measure the difference
function blockingSum(n) {
  let sum = 0;
  for (let i = 0; i < n; i++) sum += i;
  return sum;
}

// Non-blocking version using async chunking
async function nonBlockingSum(n, chunkSize = 1_000_000) {
  // YOUR CODE HERE:
  // Split the work into chunks, yield to event loop between chunks using:
  // await new Promise(resolve => setTimeout(resolve, 0));
  // Return the total sum.
}

// Test
console.time("blocking");
blockingSum(100_000_000);
console.timeEnd("blocking");

nonBlockingSum(100_000_000).then(sum => {
  console.log("non-blocking sum:", sum);
});
console.log("Event loop not blocked — this logs immediately after nonBlockingSum starts");
