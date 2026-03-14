function makeCounter(start = 0) {
  let count = start;
  return () => ++count;
}

function makeAdder(n) {
  return (x) => x + n;
}

function once(fn) {
  let called = false;
  let result;
  return (...args) => {
    if (!called) { called = true; result = fn(...args); }
    return result;
  };
}

function memoize(fn) {
  const cache = new Map();
  return (arg) => {
    if (cache.has(arg)) return cache.get(arg);
    const result = fn(arg);
    cache.set(arg, result);
    return result;
  };
}

const counter = makeCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3

const counter10 = makeCounter(10);
console.log(counter10()); // 11

const add5 = makeAdder(5);
console.log(add5(3));
console.log(add5(10));

let callCount = 0;
const onceGreet = once(() => { callCount++; return "Hello!"; });
console.log(onceGreet());
console.log(onceGreet());
console.log(callCount);

let computeCount = 0;
const slowDouble = memoize((n) => { computeCount++; return n * 2; });
console.log(slowDouble(5));
console.log(slowDouble(5));
console.log(slowDouble(6));
console.log(computeCount);
