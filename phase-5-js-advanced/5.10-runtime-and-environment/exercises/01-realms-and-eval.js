// 5.10 Exercises — Realms and eval
// Run with: node exercises/01-realms-and-eval.js

// Task 1: Cross-realm type checking
// The instanceof operator fails across realms.
// Write `isCrossRealmArray(value)` that works even when the array comes from a different realm.
// Hint: Use Array.isArray() or Object.prototype.toString.call()
function isCrossRealmArray(value) {
  // TODO: implement cross-realm array check
}

// Task 2: Safe eval wrapper
// Write `safeEval(code, context)` using new Function() that:
// - Creates a function with the context keys as parameters
// - Executes the code string with context values
// - Returns the result
// - Returns null if execution throws
function safeEval(code, context) {
  // TODO: implement using new Function()
}

// Task 3: Stack trace parsing
// Write `getCallerName()` that returns the name of the function that called the function that called getCallerName
// Use new Error().stack to extract this information
function getCallerName() {
  // TODO: parse Error().stack to get caller name
}

// Task 4: Recursive to iterative (TCO concept)
// Write `factorialTCO(n, acc = 1)` as a proper tail-recursive function
// Then write `factorialIterative(n)` as an iterative version
// Both should handle n = 10000 without stack overflow
function factorialTCO(n, acc = 1) {
  // TODO: tail-recursive factorial
}
function factorialIterative(n) {
  // TODO: iterative factorial using loop
}
