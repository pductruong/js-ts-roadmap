// Task 1: simulate circular CJS partial-export problem
function simulateCircularCJS() {
  const aExports = {};
  const seenByB = aExports.valueFromA; // undefined — captured before a.js finishes
  aExports.valueFromA = 42;
  const lazyGet = () => aExports.valueFromA;
  console.log("b sees a.valueFromA at require-time:", seenByB); // undefined
  console.log("b sees a.valueFromA lazily:", lazyGet());         // 42
}

simulateCircularCJS();

// Task 2: lazyLoad — cache the import() Promise so duplicate calls reuse it
const _lazyCache = new Map();

function lazyLoad(modulePath) {
  if (!_lazyCache.has(modulePath)) {
    _lazyCache.set(modulePath, import(modulePath));
  }
  return _lazyCache.get(modulePath);
}

// Task 3: importAll — parallel dynamic imports via Promise.all
function importAll(paths) {
  return Promise.all(paths.map(lazyLoad));
}

// Task 4: derive __filename and __dirname from import.meta.url (ESM)
import { fileURLToPath } from 'url';
import { dirname }       from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);

console.log('ESM __filename:', __filename);
console.log('ESM __dirname: ', __dirname);
console.log('parent dir:    ', dirname(__dirname));

// CJS equivalent (works in .cjs files or without "type":"module"):
//   const __filename = __filename;         // global
//   const __dirname  = __dirname;          // global
//   const parent     = require('path').dirname(__dirname);
