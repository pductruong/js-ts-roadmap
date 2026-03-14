// Solution 2: Contextual Typing, NoInfer, and Inference from Mapped Types
// -----------------------------------------------------------------------

// ─────────────────────────────────────────────
// Task 1: NoInfer (TypeScript 5.4+)
// ─────────────────────────────────────────────
// Without NoInfer, defaultValue participates in inferring T, which can silently
// widen T to a union the caller never intended.

function getValueGood<T>(arr: T[], defaultValue: NoInfer<T>): T {
  // NoInfer<T> means defaultValue is *checked* against the inferred T but does
  // NOT *contribute* to inferring T. T is determined solely from `arr`.
  return arr[0] ?? defaultValue;
}

// Demonstration: getValueGood(["a", "b"], 42) is a compile-time type error
// because T is inferred as string from the array, and 42 is not assignable to
// NoInfer<string>.
const goodResult = getValueGood(['a', 'b'], 'fallback'); // T = string ✓
console.log('getValueGood result:', goodResult);         // 'a'

const goodEmpty = getValueGood([] as string[], 'default'); // T = string ✓
console.log('getValueGood empty:', goodEmpty);             // 'default'

// ─────────────────────────────────────────────
// Task 2: satisfies vs. type annotation vs. as const
// ─────────────────────────────────────────────
type Color = { r: number; g: number; b: number };
type Palette = Record<string, Color>;

// Pattern A: explicit type annotation — literal key types are lost
const palette1: Palette = {
  red:   { r: 255, g: 0, b: 0 },
  green: { r: 0, g: 255, b: 0 },
};

// Pattern B: satisfies — validates against Palette but keeps the narrower type
const palette2 = {
  red:   { r: 255, g: 0, b: 0 },
  green: { r: 0, g: 255, b: 0 },
} satisfies Palette;

// createConfig: accepts any object whose values are Record<string, unknown>-compatible,
// returns it augmented with a validate() method, preserving the inferred shape.
function createConfig<T extends Record<string, unknown>>(
  config: T & Record<keyof T, unknown>
) {
  return {
    ...config,
    validate(): boolean {
      return Object.keys(config).length > 0;
    },
  };
}

const cfg = createConfig({ host: 'localhost', port: 8080, ssl: false });
console.log('\n=== createConfig ===');
console.log('host:', cfg.host);         // 'localhost' — literal key preserved
console.log('port:', cfg.port);         // 8080
console.log('valid:', cfg.validate());  // true

// ─────────────────────────────────────────────
// Task 3: Inference from mapped types — fromEntries
// ─────────────────────────────────────────────
// K and V are inferred from the entries array. The return type is Record<K, V>,
// giving callers a properly typed object rather than Record<string, unknown>.
function fromEntries<K extends string, V>(
  entries: ReadonlyArray<readonly [K, V]>
): Record<K, V> {
  return Object.fromEntries(entries) as Record<K, V>;
}

console.log('\n=== fromEntries ===');
const obj = fromEntries([['a', 1], ['b', 2]] as const);
// obj.a is type 1, obj.b is type 2 (with as const)
console.log('obj:', obj);   // { a: 1, b: 2 }
console.log('obj.a:', obj.a); // 1
console.log('obj.b:', obj.b); // 2

// Without as const, K = string literal union of keys, V = inferred value type
const obj2 = fromEntries([['x', true], ['y', false]]);
console.log('obj2:', obj2); // { x: true, y: false }

// ─────────────────────────────────────────────
// Task 4: Inference with generic constraints
// ─────────────────────────────────────────────

// pick: returns Pick<T, K> — only the listed keys, fully typed.
function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: readonly K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    result[key] = obj[key];
  }
  return result;
}

console.log('\n=== pick ===');
const user = { id: 1, name: 'Alice', age: 30 };
const partial = pick(user, ['id', 'name']);
console.log('partial:', partial);    // { id: 1, name: 'Alice' }
console.log('partial.id:', partial.id);     // 1   — type: number ✓
console.log('partial.name:', partial.name); // 'Alice' — type: string ✓
// partial.age would be a compile error — "age" was not picked ✓

// mapValues: applies fn to every value, returns Record<keyof T, U>.
function mapValues<T extends object, U>(
  obj: T,
  fn: (value: T[keyof T], key: keyof T) => U
): Record<keyof T, U> {
  const result = {} as Record<keyof T, U>;
  for (const key of Object.keys(obj) as Array<keyof T>) {
    result[key] = fn(obj[key], key);
  }
  return result;
}

console.log('\n=== mapValues ===');
const lengths = mapValues({ a: 'hello', b: 'world' }, (v) => (v as string).length);
console.log('lengths:', lengths);   // { a: 5, b: 5 }
console.log('lengths.a:', lengths.a); // 5 — type: number ✓
console.log('lengths.b:', lengths.b); // 5 — type: number ✓

const doubled = mapValues({ x: 1, y: 2, z: 3 }, (v) => (v as number) * 2);
console.log('doubled:', doubled);   // { x: 2, y: 4, z: 6 }
