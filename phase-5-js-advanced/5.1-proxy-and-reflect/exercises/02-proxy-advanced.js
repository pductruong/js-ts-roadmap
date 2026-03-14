// Exercise 2: Advanced Proxy Patterns
// -------------------------------------

// 2a. Observable — notify a listener on every property change
function observable(target, onChange) {
  return new Proxy(target, {
    set(target, key, value, receiver) {
      const old = target[key];
      const result = Reflect.set(target, key, value, receiver);
      if (old !== value) onChange(key, value, old);
      return result;
    },
  });
}

// 2b. Memoization proxy for a function
// Wrap a function so repeated calls with the same first argument are cached.
function memoize(fn) {
  const cache = new Map();
  return new Proxy(fn, {
    apply(target, thisArg, args) {
      const key = args[0];
      if (cache.has(key)) {
        console.log(`[cache hit] ${key}`);
        return cache.get(key);
      }
      const result = Reflect.apply(target, thisArg, args);
      cache.set(key, result);
      return result;
    },
  });
}

// 2c. Negative array indices proxy
// Makes arr[-1] return the last element, arr[-2] the second to last, etc.
function negativeIndex(arr) {
  return new Proxy(arr, {
    get(target, key, receiver) {
      // YOUR CODE HERE
      // Hint: check if key is a numeric string and negative
    },
  });
}

// 2d. Build a simple reactive system (like Vue 3's reactive())
// When a reactive object's property changes, all registered effects re-run.
const effects = new Set();
let currentEffect = null;

function reactive(target) {
  return new Proxy(target, {
    get(target, key, receiver) {
      // Track: if there's a currentEffect running, register it as a dependency
      if (currentEffect) effects.add(currentEffect);
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      const result = Reflect.set(target, key, value, receiver);
      // Trigger: re-run all effects
      effects.forEach(fn => fn());
      return result;
    },
  });
}

function watchEffect(fn) {
  currentEffect = fn;
  fn(); // run once to collect dependencies
  currentEffect = null;
}

// Tests
const state = observable({ count: 0 }, (key, newVal, oldVal) => {
  console.log(`${key}: ${oldVal} → ${newVal}`);
});
state.count = 1; // count: 0 → 1
state.count = 2; // count: 1 → 2

let computeCount = 0;
const expensive = memoize((n) => { computeCount++; return n * n; });
console.log(expensive(5));  // 25
console.log(expensive(5));  // 25 (cache hit)
console.log(expensive(6));  // 36
console.log("computed:", computeCount); // 2

const arr = negativeIndex([1, 2, 3, 4, 5]);
console.log(arr[-1]); // 5
console.log(arr[-2]); // 4
console.log(arr[0]);  // 1

const reactiveState = reactive({ name: "Alice", count: 0 });
watchEffect(() => console.log("Effect:", reactiveState.name, reactiveState.count));
reactiveState.count = 1; // re-runs effect
reactiveState.name = "Bob"; // re-runs effect
