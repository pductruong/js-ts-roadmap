// Exercise 2: Circular Dependencies & Dynamic Imports
// ----------------------------------------------------
// Concepts are illustrated with comments and simulations.
// Actual import() calls require resolvable module paths; those lines are
// shown as comments so the file runs cleanly with `node`.

// --------------------------------------------------------------------------
// Task 1: Circular CJS requires — what value does the second module get?
// --------------------------------------------------------------------------
//
// Imagine two files:
//
//   -- a.js (CJS) --
//   const b = require('./b');
//   exports.valueFromA = 42;
//   console.log('a sees b.valueFromB:', b.valueFromB); // 99 (b loaded first)
//
//   -- b.js (CJS) --
//   const a = require('./a');          // <-- a is mid-load here
//   exports.valueFromB = 99;
//   console.log('b sees a.valueFromA:', a.valueFromA); // undefined!
//
// Why?
//   Node registers an EMPTY exports object for a.js in its module cache the
//   moment it begins loading. When a.js requires b.js, Node starts b.js and
//   hands it the PARTIAL (still-empty) exports of a.js. b.js therefore sees
//   a.valueFromA as undefined at module-top-level.
//
// Fix: access the value lazily inside a function — called after both modules
// have finished loading — instead of capturing it at the top level.
//
//   -- b.js (fixed) --
//   const a = require('./a');
//   exports.getValueFromA = () => a.valueFromA; // lazy: reads after load

// Simulate the partial-export problem without real files:
function simulateCircularCJS() {
  const aExports = {}; // partial — nothing assigned yet (mirrors mid-load state)

  // b.js captures the value NOW — before a.js finishes loading
  const seenByB = aExports.valueFromA; // undefined

  // a.js finishes loading and populates its exports
  aExports.valueFromA = 42;

  // Lazy accessor: reads after a.js has finished
  const lazyGet = () => aExports.valueFromA;

  console.log("b sees a.valueFromA at require-time:", seenByB); // undefined
  console.log("b sees a.valueFromA lazily:", lazyGet());         // 42
}

simulateCircularCJS();

// --------------------------------------------------------------------------
// Task 2: lazyLoad(modulePath) — dynamic import() with caching
// --------------------------------------------------------------------------
// import() returns a Promise of the module namespace object.
// Cache the Promise (not just the resolved value) so concurrent callers
// before the first resolution share a single disk/network load.

// TODO: implement lazyLoad so that:
//   - the first call to lazyLoad(path) calls import(path) and stores the Promise
//   - subsequent calls return the cached Promise (no duplicate load)

const _lazyCache = new Map();

function lazyLoad(modulePath) {
  // TODO: if _lazyCache does not have modulePath, set it to import(modulePath)
  //       then return _lazyCache.get(modulePath)
}

// Usage (requires an actual resolvable path — shown as comment):
// lazyLoad('./some-module.js').then(m => console.log(m.default));
// lazyLoad('./some-module.js').then(m => console.log('cached:', m.default));

// --------------------------------------------------------------------------
// Task 3: importAll(paths) — load multiple modules in parallel
// --------------------------------------------------------------------------
// TODO: implement importAll so it:
//   - accepts an array of module paths
//   - loads all of them in parallel (not one-by-one)
//   - returns a Promise that resolves to an array of namespace objects
//   - uses lazyLoad internally so results are cached for future calls

function importAll(paths) {
  // TODO: Promise.all(paths.map(lazyLoad))
}

// Usage (comment — needs real paths):
// importAll(['./a.js', './b.js']).then(([a, b]) => console.log(a, b));

// --------------------------------------------------------------------------
// Task 4: import.meta.url — deriving __filename and __dirname in ESM
// --------------------------------------------------------------------------
// In CJS, Node provides __filename and __dirname as globals.
// In ESM ("type":"module"), those globals don't exist.
// You must derive equivalent values from import.meta.url.
//
// ESM pattern:
//   import { fileURLToPath } from 'url';
//   import { dirname }       from 'path';
//   const __filename = fileURLToPath(import.meta.url);
//   const __dirname  = dirname(__filename);
//
// TODO: using import.meta.url (available in this ESM file), derive
//       __filename and __dirname, then log them.

import { fileURLToPath } from 'url';
import { dirname }       from 'path';

function showFilePaths() {
  // TODO: derive __filename from import.meta.url using fileURLToPath()
  //       derive __dirname from __filename using dirname()
  //       log both values and also log dirname(__dirname) (parent directory)
  const __filename = fileURLToPath(import.meta.url);
  const __dirname  = dirname(__filename);
  console.log('ESM __filename:', __filename);
  console.log('ESM __dirname: ', __dirname);
  console.log('parent dir:    ', dirname(__dirname));
}

showFilePaths();
