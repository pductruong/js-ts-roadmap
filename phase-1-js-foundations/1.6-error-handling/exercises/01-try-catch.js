// Exercise 1: try / catch / finally
// -----------------------------------

// 1a. Safely parse JSON. Return parsed value or null on error.
function safeParseJSON(str) {
  // YOUR CODE HERE
}

// 1b. Safely get a nested property. Return defaultValue if any error occurs.
function safeGet(obj, key, defaultValue) {
  try {
    const value = obj[key];
    return value !== undefined ? value : defaultValue;
  } catch {
    return defaultValue;
  }
}

// 1c. Divide a by b. Throw an Error if b is 0.
function divide(a, b) {
  // YOUR CODE HERE
}

// 1d. Call divide safely. Return null if it throws.
function safeDivide(a, b) {
  // YOUR CODE HERE
}

// 1e. Demonstrate finally: always log "done" even if an error is thrown
function withCleanup(fn) {
  try {
    return fn();
  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    console.log("done");
  }
}

// Tests
console.log(safeParseJSON('{"a":1}'));   // { a: 1 }
console.log(safeParseJSON("not json"));  // null
console.log(safeDivide(10, 2));          // 5
console.log(safeDivide(10, 0));          // null
withCleanup(() => "ok");                 // logs "done", returns "ok"
withCleanup(() => { throw new Error("oops"); }); // logs error + "done"
