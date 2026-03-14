// 5.10 Exercises — Error and Environment
// Run with: node exercises/02-error-and-environment.js

// Task 1: Custom error with clean stack
// Write `createError(message, constructor)` that creates an error with:
// - The error constructor filtered out of the stack trace (using Error.captureStackTrace if available)
// - A clean stack showing only user code
class AppError extends Error {}
function createError(message, Constructor = AppError) {
  // TODO: create error, use Error.captureStackTrace if available
}

// Task 2: Environment detection
// Write `detectEnvironment()` that returns an object:
// { isBrowser, isNode, isDeno, isWorker, globalThisAvailable }
// by checking for globalThis, process, window, self, etc.
function detectEnvironment() {
  // TODO: detect JS runtime environment
}

// Task 3: Global scope access
// Write `getGlobal()` that returns the global object in any environment
// Without using globalThis directly (show the old patterns)
function getGlobal() {
  // TODO: return global object cross-environment
}

// Task 4: Function source inspection
// Write `getFunctionInfo(fn)` returning { name, paramCount, isArrow, isAsync, isGenerator }
// Use fn.toString() to detect arrow (no 'function' keyword) and other properties
function getFunctionInfo(fn) {
  // TODO: parse function source to extract info
}
