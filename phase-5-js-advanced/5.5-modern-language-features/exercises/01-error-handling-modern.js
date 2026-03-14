// Exercise 1: Modern Error Handling
// -----------------------------------

// 1a. Build an error chain using `cause`
// fetchUserProfile() -> calls fetchUser() -> calls apiRequest()
// Each layer should wrap the error with cause and add context.

async function apiRequest(url) {
  // Simulate a network failure
  throw new Error(`Network timeout connecting to ${url}`);
}

async function fetchUser(id) {
  try {
    return await apiRequest(`/api/users/${id}`);
  } catch (err) {
    // YOUR CODE HERE: throw new Error with cause
  }
}

async function fetchUserProfile(id) {
  try {
    return await fetchUser(id);
  } catch (err) {
    // YOUR CODE HERE: throw new Error with cause
  }
}

// Function to print the full error chain
function printErrorChain(err, depth = 0) {
  console.log(`${"  ".repeat(depth)}Error: ${err.message}`);
  if (err.cause) printErrorChain(err.cause, depth + 1);
}

// 1b. Use AggregateError
// Try to fetch from multiple mirrors. If ALL fail, throw AggregateError.
async function fetchFromMirrors(mirrors) {
  // YOUR CODE HERE: try each mirror, collect errors, throw AggregateError if all fail
  // Return the first successful result
}

async function fetchMirror(url) {
  if (url.includes("bad")) throw new Error(`Mirror ${url} unreachable`);
  return `data from ${url}`;
}

// Tests
fetchUserProfile(1).catch(err => {
  printErrorChain(err);
  // Error: Failed to load user profile for id 1
  //   Error: Failed to fetch user 1
  //     Error: Network timeout connecting to /api/users/1
});

fetchFromMirrors(["bad-mirror-1", "bad-mirror-2"])
  .catch(err => {
    console.log(err instanceof AggregateError); // true
    console.log(err.message);                   // "All mirrors failed"
    console.log(err.errors.length);             // 2
  });

fetchFromMirrors(["bad-mirror-1", "good-mirror"])
  .then(data => console.log(data)); // "data from good-mirror"
