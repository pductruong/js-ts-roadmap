// 5.10 Solutions — Realms and eval
// Run with: node exercises/solutions/01-realms-and-eval.js

// ---------------------------------------------------------------------------
// Task 1: Cross-realm type checking
// ---------------------------------------------------------------------------
// instanceof checks the prototype chain against the constructor in the current
// realm. An array from a different realm has a different Array.prototype.
// Array.isArray() is specified to work across realm boundaries.
// Object.prototype.toString.call() reads the internal [[Symbol.toStringTag]]
// slot, which is also realm-independent.

function isCrossRealmArray(value) {
  // Primary: Array.isArray pierces realm boundaries per spec
  if (Array.isArray(value)) return true;
  // Fallback for environments where Array.isArray may be absent (very old)
  return Object.prototype.toString.call(value) === '[object Array]';
}

// ---------------------------------------------------------------------------
// Task 2: Safe eval wrapper
// ---------------------------------------------------------------------------
// new Function() always executes in global scope, never in the caller's local
// scope. Passing context as explicit parameters limits what the code can see.

function safeEval(code, context) {
  try {
    const keys = Object.keys(context);
    const values = keys.map(k => context[k]);
    // Build: function(key1, key2, ...) { return <code> }
    const fn = new Function(...keys, `return (${code})`);
    return fn(...values);
  } catch (_) {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Task 3: Stack trace parsing
// ---------------------------------------------------------------------------
// Error().stack is a V8/SpiderMonkey convention, not a spec requirement.
// The format per V8 is:
//   Error
//       at getCallerName (file.js:10:5)
//       at directCaller (file.js:20:3)   <- index 2 (after "Error" line + getCallerName)
//       at outerCaller (file.js:30:1)    <- index 3 — this is what we want
//
// Frames: [0] "Error", [1] getCallerName, [2] direct caller, [3] caller's caller

function getCallerName() {
  const stack = new Error().stack;
  if (!stack) return null;

  const lines = stack.split('\n');
  // lines[0]: "Error"
  // lines[1]: getCallerName frame
  // lines[2]: the function that called getCallerName
  // lines[3]: the function that called THAT function (what we want)
  const targetLine = lines[3];
  if (!targetLine) return null;

  // V8 format: "    at FunctionName (file:line:col)"
  // or:        "    at Object.FunctionName (file:line:col)"
  const match = targetLine.trim().match(/^at\s+([^\s(]+)/);
  if (!match) return null;

  const raw = match[1];
  // Strip qualifier like "Object." if present
  return raw.includes('.') ? raw.split('.').pop() : raw;
}

// ---------------------------------------------------------------------------
// Task 4: Recursive to iterative (TCO concept)
// ---------------------------------------------------------------------------
// factorialTCO is written as a proper tail call: the recursive call is the
// last operation and its return value is immediately returned. In an engine
// that implements Proper Tail Calls (ES2015 strict mode), this would reuse
// the stack frame. V8 does NOT implement PTC as of 2025, so large n will
// still overflow — factorialIterative is safe in any engine.

// 'use strict' is required for Proper Tail Calls per spec, but cannot be
// placed inside a function that uses default parameters in older V8 builds.
// In practice, V8 does not implement PTC regardless of strict mode.
function factorialTCO(n, acc) {
  if (acc === undefined) acc = 1;
  if (n <= 1) return acc;
  return factorialTCO(n - 1, n * acc); // proper tail call (PTC in strict mode, per spec)
}

function factorialIterative(n) {
  let acc = BigInt(1);
  for (let i = BigInt(2); i <= BigInt(n); i++) {
    acc *= i;
  }
  return acc;
}

// ---------------------------------------------------------------------------
// Demos
// ---------------------------------------------------------------------------

console.log('--- Task 1: Cross-realm type checking ---');
console.log(isCrossRealmArray([1, 2, 3]));       // true
console.log(isCrossRealmArray('not an array'));   // false
console.log(isCrossRealmArray({ length: 3 }));   // false
console.log(isCrossRealmArray(null));             // false
// Simulate a cross-realm array using Object.create with Array.prototype from
// a different realm is not possible in plain Node without vm, but Array.isArray
// handles the real case:
const fakeArray = Object.create(Array.prototype);
console.log(fakeArray instanceof Array);          // true (same realm, same prototype)
console.log(Array.isArray(fakeArray));            // false — not a true array exotic object
// A real cross-realm array would return true from Array.isArray regardless.

console.log('\n--- Task 2: Safe eval wrapper ---');
const result1 = safeEval('x * y + z', { x: 3, y: 4, z: 5 });
console.log(result1); // 17

const result2 = safeEval('name.toUpperCase()', { name: 'world' });
console.log(result2); // WORLD

const result3 = safeEval('throw new Error("boom")', {});
console.log(result3); // null

const result4 = safeEval('undeclaredVar', {});
console.log(result4); // null

console.log('\n--- Task 3: Stack trace parsing ---');
function level2() {
  return getCallerName();
}
function level1() {
  return level2();
}
// level1 calls level2, which calls getCallerName.
// getCallerName should return 'level1' (the caller of level2).
console.log(level1()); // level1

console.log('\n--- Task 4: Factorial ---');
// factorialTCO is fine for moderate n; V8 will overflow for very large n
// because PTC is not implemented.
console.log(factorialTCO(10)); // 3628800

// factorialIterative uses BigInt to handle arbitrarily large numbers
console.log(factorialIterative(10).toString());     // 3628800
console.log(factorialIterative(20).toString());     // 2432902008176640000
console.log(factorialIterative(10000).toString().length + ' digits'); // ~35659 digits
