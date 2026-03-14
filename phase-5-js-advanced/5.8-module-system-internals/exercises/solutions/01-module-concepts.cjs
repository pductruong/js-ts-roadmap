function createCJSModule() {
  let count = 0;
  return {
    count,
    increment() { count++; },
    getCount() { return count; },
  };
}

function createESMModule() {
  let count = 0;
  return {
    get count() { return count; },
    increment() { count++; },
  };
}

function createLazyLoader(factory) {
  let cache = null;
  return async function load() {
    if (!cache) cache = await factory();
    return cache;
  };
}

const path = require("path");
console.log("CJS __dirname:", __dirname);

const cjs = createCJSModule();
cjs.increment();
console.log("CJS count (snapshot):", cjs.count);
console.log("CJS count (getter):", cjs.getCount());

const esm = createESMModule();
esm.increment();
console.log("ESM count (live binding):", esm.count);

const loadHeavy = createLazyLoader(async () => {
  await new Promise(r => setTimeout(r, 100));
  return { compute: (n) => n * n };
});
loadHeavy().then(m => console.log("Lazy loaded, 5^2 =", m.compute(5)));
loadHeavy().then(m => console.log("Cached call, 6^2 =",  m.compute(6)));
