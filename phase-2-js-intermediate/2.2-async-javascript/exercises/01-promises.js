// Exercise 1: Promises
// ---------------------
// Run with: node 01-promises.js

// Helper: simulates a network request
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function fetchUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id <= 0) reject(new Error("Invalid user id"));
      else resolve({ id, name: `User${id}`, age: 20 + id });
    }, 100);
  });
}

// 1a. Fetch user with id=1, then log their name using .then()
// YOUR CODE HERE

// 1b. Fetch user with id=-1, catch the error and log "Error: {message}"
// YOUR CODE HERE

// 1c. Fetch users 1, 2, and 3 in parallel. Log all three names.
// YOUR CODE HERE (use Promise.all)

// 1d. Race: fetch users 1 and 2. Log the name of whoever resolves first.
// (Both resolve at same speed here, so first one wins in practice)
// YOUR CODE HERE (use Promise.race)

// 1e. Build a withTimeout(promise, ms) utility.
// If the promise doesn't resolve within ms milliseconds, reject with "Timeout".
function withTimeout(promise, ms) {
  // YOUR CODE HERE (use Promise.race)
}

// Test 1e
withTimeout(delay(50), 200).then(() => console.log("Fast: OK"));
withTimeout(delay(500), 100).catch(err => console.log("Slow:", err.message)); // "Timeout"
