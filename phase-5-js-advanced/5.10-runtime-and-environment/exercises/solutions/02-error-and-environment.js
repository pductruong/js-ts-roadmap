// 5.10 Solutions — Error and Environment
// Run with: node exercises/solutions/02-error-and-environment.js

// ---------------------------------------------------------------------------
// Task 1: Custom error with clean stack
// ---------------------------------------------------------------------------
// Error.captureStackTrace(target, constructorOpt) is a V8-specific API.
// The second argument tells V8 which function to treat as the top of the
// user's stack — all frames at or above it are excluded from the trace.
// Without it, the constructor itself appears as the top frame, which is
// noise in logs and error reporters.

class AppError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AppError';
  }
}

function createError(message, Constructor = AppError) {
  const error = new Constructor(message);
  error.name = Constructor.name;

  if (typeof Error.captureStackTrace === 'function') {
    // Excludes createError (and Constructor) from the stack trace.
    // The top frame in the trace will be whoever called createError.
    Error.captureStackTrace(error, createError);
  }

  return error;
}

// ---------------------------------------------------------------------------
// Task 2: Environment detection
// ---------------------------------------------------------------------------
// Each runtime exposes different globals:
//   Browser:  window, document, navigator
//   Node.js:  process.versions.node, global
//   Deno:     Deno (global object)
//   Worker:   self (WorkerGlobalScope), no window/document
// globalThis was standardized in ES2020 and is available in all modern runtimes.

function detectEnvironment() {
  const g = (function () {
    // Safe way to get the global without triggering ReferenceError
    if (typeof globalThis !== 'undefined') return globalThis;
    if (typeof global !== 'undefined') return global;
    if (typeof window !== 'undefined') return window;
    if (typeof self !== 'undefined') return self;
    return {};
  })();

  const isBrowser =
    typeof g.window !== 'undefined' &&
    typeof g.document !== 'undefined' &&
    typeof g.navigator !== 'undefined';

  const isNode =
    typeof g.process !== 'undefined' &&
    g.process !== null &&
    typeof g.process.versions === 'object' &&
    typeof g.process.versions.node === 'string';

  const isDeno =
    typeof g.Deno !== 'undefined' &&
    typeof g.Deno.version !== 'undefined';

  // Web Worker: has self but no window and no document
  const isWorker =
    !isBrowser &&
    typeof g.self !== 'undefined' &&
    typeof g.WorkerGlobalScope !== 'undefined';

  const globalThisAvailable = typeof globalThis !== 'undefined';

  return { isBrowser, isNode, isDeno, isWorker, globalThisAvailable };
}

// ---------------------------------------------------------------------------
// Task 3: Global scope access
// ---------------------------------------------------------------------------
// Pre-ES2020 patterns for getting the global object, in priority order:
//   1. `self`   — defined in browsers and workers (WorkerGlobalScope)
//   2. `window` — browsers only
//   3. `global` — Node.js
//   4. `this`   — works in non-strict global scope (unreliable in modules)
// The Function('return this')() trick always returns the true global because
// new Function creates a function in global scope, even in strict mode
// contexts. It is blocked by CSP but is the most reliable pre-ES2020 option.

function getGlobal() {
  if (typeof self !== 'undefined') return self;
  if (typeof window !== 'undefined') return window;
  if (typeof global !== 'undefined') return global;
  // Last resort: indirect eval to escape strict mode
  // eslint-disable-next-line no-new-func
  return new Function('return this')();
}

// ---------------------------------------------------------------------------
// Task 4: Function source inspection
// ---------------------------------------------------------------------------
// fn.toString() returns the source text of the function as defined.
// Arrow functions do not have the 'function' keyword.
// Async functions start with 'async'.
// Generators use 'function*'.
// fn.length is the number of declared parameters (excluding rest and defaults).
// fn.name is the inferred or declared name.

function getFunctionInfo(fn) {
  const src = fn.toString();

  // Strip leading whitespace/comments before the signature
  const normalized = src.trimStart();

  const isAsync = normalized.startsWith('async');
  // Generator: function* or async function*
  const isGenerator = /function\s*\*/.test(normalized);
  // Arrow: no 'function' keyword at the start (even after 'async')
  const isArrow = !normalized.replace(/^async\s*/, '').startsWith('function');

  return {
    name: fn.name || null,
    paramCount: fn.length,
    isArrow,
    isAsync,
    isGenerator,
  };
}

// ---------------------------------------------------------------------------
// Demos
// ---------------------------------------------------------------------------

console.log('--- Task 1: Custom error with clean stack ---');
function userCode() {
  return createError('something went wrong');
}
const err = userCode();
console.log(err instanceof AppError);  // true
console.log(err.name);                 // AppError
console.log(err.message);             // something went wrong
// Top frame of the stack should be userCode, not createError
const topFrame = err.stack.split('\n')[1];
console.log('Top frame:', topFrame.trim());

console.log('\n--- Custom constructor ---');
class ValidationError extends Error {}
const verr = createError('invalid input', ValidationError);
console.log(verr instanceof ValidationError); // true
console.log(verr.name);                       // ValidationError

console.log('\n--- Task 2: Environment detection ---');
const env = detectEnvironment();
console.log(env);
// In Node.js: { isBrowser: false, isNode: true, isDeno: false, isWorker: false, globalThisAvailable: true }

console.log('\n--- Task 3: Global scope access ---');
const g = getGlobal();
console.log(typeof g);               // object
console.log(g === global || g === globalThis); // true in Node.js

console.log('\n--- Task 4: Function source inspection ---');
function regularFn(a, b, c) { return a + b + c; }
const arrowFn = (x, y) => x * y;
async function asyncFn(a) { return a; }
function* genFn(a, b) { yield a; yield b; }
const asyncArrow = async (x) => x;

console.log(getFunctionInfo(regularFn));
// { name: 'regularFn', paramCount: 3, isArrow: false, isAsync: false, isGenerator: false }

console.log(getFunctionInfo(arrowFn));
// { name: 'arrowFn', paramCount: 2, isArrow: true, isAsync: false, isGenerator: false }

console.log(getFunctionInfo(asyncFn));
// { name: 'asyncFn', paramCount: 1, isArrow: false, isAsync: true, isGenerator: false }

console.log(getFunctionInfo(genFn));
// { name: 'genFn', paramCount: 2, isArrow: false, isAsync: false, isGenerator: true }

console.log(getFunctionInfo(asyncArrow));
// { name: 'asyncArrow', paramCount: 1, isArrow: true, isAsync: true, isGenerator: false }

// Anonymous function
console.log(getFunctionInfo(function (a, b) { return a - b; }));
// { name: '', paramCount: 2, isArrow: false, isAsync: false, isGenerator: false }
