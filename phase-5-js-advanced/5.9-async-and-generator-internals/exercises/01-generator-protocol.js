// Exercise 1: Generator Protocol Deep Dive
// -----------------------------------------

// 1a. Two-way communication with generators
// Create a generator that acts as a "calculator session":
// - yield "ready" to signal it's waiting
// - On each next(value), add value to a running total and yield the new total
// - When told to "reset", reset to 0
// - Return the final total when done() is called
function* calculatorSession() {
  // YOUR CODE HERE
}

// 1b. Generator with error handling
// Create a generator that yields items from an array one by one.
// If an error is thrown in, log "error: {msg}" and continue with the next item.
// If return() is called, log "cleanup" and stop.
function* resilientIterator(items) {
  // YOUR CODE HERE
}

// 1c. yield* delegation — chain generators
function* range(start, end) {
  for (let i = start; i <= end; i++) yield i;
}

// Write a generator that yields: [1..3], then [10..12], then [20..22]
// using yield* to delegate to range()
function* multiRange() {
  // YOUR CODE HERE
}

// 1d. Implement a take() function using a generator
// take(n, iterable) — returns a generator that yields only the first n items
function* take(n, iterable) {
  // YOUR CODE HERE
}

// 1e. Write an async generator that paginates results
async function* paginate(fetchPage, startPage = 1) {
  // fetchPage(pageNum) returns { items: [], hasMore: boolean }
  // Yield each item from each page until hasMore is false
  // YOUR CODE HERE
}

// Tests
// Generator protocol note: the value passed to next() becomes the RESULT of the yield expression
// that just paused. next(10) resumes `yield "ready"` — 10 is discarded (nothing captures it).
// The loop then hits `const input = yield total` and emits total (still 0) before pausing.
const calc = calculatorSession();
console.log(calc.next().value);        // "ready"
console.log(calc.next(10).value);      // 0  (10 discarded; first loop yield emits total=0)
console.log(calc.next(5).value);       // 5  (input=5, total becomes 5)
console.log(calc.next("reset").value); // 0  (reset, total becomes 0)
console.log(calc.next(7).value);       // 7  (input=7, total becomes 7)
console.log(calc.return().value);      // undefined (return() with no arg closes the generator; value=undefined)

const iter = resilientIterator(["a", "b", "c", "d"]);
console.log(iter.next().value);                 // "a"
console.log(iter.throw(new Error("skip")).value); // logs "error: skip", returns "b"
console.log(iter.next().value);                 // "c"
iter.return();                                  // logs "cleanup"

console.log([...multiRange()]); // [1, 2, 3, 10, 11, 12, 20, 21, 22]

function* naturals() { let n = 1; while (true) yield n++; }
console.log([...take(5, naturals())]); // [1, 2, 3, 4, 5]

// Test async generator
async function mockFetch(page) {
  const allItems = [1,2,3,4,5,6,7,8,9,10];
  const start = (page - 1) * 3;
  const items = allItems.slice(start, start + 3);
  return { items, hasMore: start + 3 < allItems.length };
}
(async () => {
  const results = [];
  for await (const item of paginate(mockFetch)) results.push(item);
  console.log(results); // [1,2,3,4,5,6,7,8,9,10]
})();
