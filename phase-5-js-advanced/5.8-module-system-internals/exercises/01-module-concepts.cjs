// Exercise 1: Module System Concepts
// ------------------------------------
// This file uses CommonJS (no .mjs extension) to demonstrate CJS behavior.
// For ESM live binding demos, see the comments — they require .mjs files.

// 1a. CJS exports are value copies — demonstrate this
// Simulate the live binding vs snapshot difference in plain JS

function createCJSModule() {
  // Simulate CJS: returns a snapshot of `count` at export time
  let count = 0;
  return {
    count,  // snapshot — callers won't see updates
    increment() { count++; },
    getCount() { return count; }, // getter works — reads live value
  };
}

function createESMModule() {
  // Simulate ESM live binding: always reads the current value
  let count = 0;
  const module = {
    get count() { return count; }, // getter simulates live binding
    increment() { count++; },
  };
  return module;
}

// 1b. Dynamic import simulation
// Write a function that lazily loads and caches a "module"
// (simulates import() behavior without actual ES modules)
function createLazyLoader(factory) {
  let cache = null;
  return async function load() {
    if (!cache) {
      cache = await factory();
    }
    return cache;
  };
}

// 1c. import.meta.url equivalent in CJS
// In CJS, __filename and __dirname are available.
// In ESM, you must derive them from import.meta.url.
// Write the ESM equivalent as a comment and the CJS version as code.

const path = require("path");
const __filename_cjs = __filename;
const __dirname_cjs  = __dirname;
// ESM equivalent (paste in a .mjs file):
// import { fileURLToPath } from "url";
// import { dirname } from "path";
// const __filename = fileURLToPath(import.meta.url);
// const __dirname  = dirname(__filename);

console.log("CJS __dirname:", __dirname_cjs);

// 1d. Describe what happens in circular CJS imports
function explainCircularCJS() {
  // Explain in comments what would happen if A requires B and B requires A:
  // - Which module gets a partial/incomplete export object?
  // - When does the value become available?
  // - How can you avoid the problem?
  return `
  In CJS circular imports:
  - When A is being loaded and requires B, Node gives B a PARTIAL exports of A
    (only what A has exported SO FAR, before its own require() call)
  - If A hasn't exported anything yet, B gets an empty object {}
  - Fix: use lazy access (call a function to get the value later, not top-level assignment)
  `;
}

// Tests
const cjs = createCJSModule();
cjs.increment();
console.log("CJS count (snapshot):", cjs.count);     // 0 — snapshot!
console.log("CJS count (getter):", cjs.getCount());  // 1 — live!

const esm = createESMModule();
esm.increment();
console.log("ESM count (live binding):", esm.count); // 1 — live!

const loadHeavy = createLazyLoader(async () => {
  await new Promise(r => setTimeout(r, 100)); // simulate load time
  return { compute: (n) => n * n };
});

loadHeavy().then(m => console.log("Lazy loaded, 5^2 =", m.compute(5)));
loadHeavy().then(m => console.log("Cached call, 6^2 =",  m.compute(6)));

console.log(explainCircularCJS());
