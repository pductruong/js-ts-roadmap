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

function memoize(fn) {
  const cache = new Map();
  return new Proxy(fn, {
    apply(target, thisArg, args) {
      const key = args[0];
      if (cache.has(key)) { console.log(`[cache hit] ${key}`); return cache.get(key); }
      const result = Reflect.apply(target, thisArg, args);
      cache.set(key, result);
      return result;
    },
  });
}

function negativeIndex(arr) {
  return new Proxy(arr, {
    get(target, key, receiver) {
      const index = Number(key);
      if (Number.isInteger(index) && index < 0) {
        return Reflect.get(target, target.length + index, receiver);
      }
      return Reflect.get(target, key, receiver);
    },
  });
}

const effects = new Set();
let currentEffect = null;
function reactive(target) {
  return new Proxy(target, {
    get(target, key, receiver) {
      if (currentEffect) effects.add(currentEffect);
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      const result = Reflect.set(target, key, value, receiver);
      effects.forEach(fn => fn());
      return result;
    },
  });
}
function watchEffect(fn) { currentEffect = fn; fn(); currentEffect = null; }

const state = observable({ count: 0 }, (key, n, o) => console.log(`${key}: ${o} → ${n}`));
state.count = 1; state.count = 2;

let computeCount = 0;
const expensive = memoize(n => { computeCount++; return n * n; });
console.log(expensive(5)); console.log(expensive(5)); console.log(expensive(6));
console.log("computed:", computeCount);

const arr = negativeIndex([1, 2, 3, 4, 5]);
console.log(arr[-1], arr[-2], arr[0]);

const reactiveState = reactive({ name: "Alice", count: 0 });
watchEffect(() => console.log("Effect:", reactiveState.name, reactiveState.count));
reactiveState.count = 1;
reactiveState.name = "Bob";
