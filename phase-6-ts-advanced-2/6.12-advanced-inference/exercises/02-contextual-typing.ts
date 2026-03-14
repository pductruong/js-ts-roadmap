// Exercise 2: Contextual Typing, NoInfer, and Inference from Mapped Types
// -------------------------------------------------------------------------

// ─────────────────────────────────────────────
// Task 1: NoInfer (TypeScript 5.4+)
// ─────────────────────────────────────────────
// Without NoInfer, every argument typed as T participates in inference of T.
// A default value typed as T can silently widen T to include types the caller
// never intended.

// PROBLEM: TypeScript infers T = string | number here because 42 is also a candidate.
function getValueBad<T>(arr: T[], defaultValue: T): T {
  return arr[0] ?? defaultValue;
}
// const result = getValueBad(["a", "b"], 42);
// ↑ T inferred as string | number — the array is string[], but 42 widens T.

// SOLUTION: Wrap defaultValue in NoInfer<T> so it is *checked* against the
// inferred T but does NOT *contribute* to inferring T.
function getValueGood<T>(arr: T[], defaultValue: NoInfer<T>): T {
  // TODO: implement — same body as getValueBad.
  // The difference is purely in the signature: NoInfer<T> tells the compiler
  // "do not use this argument to determine what T is."
  throw new Error("not implemented");
}
// const good = getValueGood(["a", "b"], 42);
// ↑ should be a type error: Argument of type 'number' is not assignable to parameter
//   of type 'NoInfer<string>'.

// ─────────────────────────────────────────────
// Task 2: satisfies vs. type annotation vs. as const
// ─────────────────────────────────────────────
type Color = { r: number; g: number; b: number };
type Palette = Record<string, Color>;

// Pattern A: explicit type annotation
// The whole value is widened to Palette. Literal key types are lost.
const palette1: Palette = {
  red:   { r: 255, g: 0, b: 0 },
  green: { r: 0, g: 255, b: 0 },
};
// palette1.red      // type: Color
// palette1.notExist // type: Color — NO error, because Palette is Record<string, Color>

// Pattern B: satisfies
// TypeScript validates the value against Palette but keeps the narrower inferred type.
const palette2 = {
  red:   { r: 255, g: 0, b: 0 },
  green: { r: 0, g: 255, b: 0 },
} satisfies Palette;
// palette2.red      // type: { r: number; g: number; b: number }
// palette2.notExist // ERROR — "notExist" does not exist on this object

// Write a function `createConfig` that:
// - Accepts any object whose values are Record<string, unknown>-compatible.
// - Returns the object augmented with a `validate()` method that checks all values.
// - Preserves the inferred shape of the input (caller keeps literal key types).
function createConfig<T extends Record<string, unknown>>(
  config: T & Record<keyof T, unknown>
) {
  // TODO: return config with a validate method that checks Object.keys(config).length > 0
  throw new Error("not implemented");
}

// ─────────────────────────────────────────────
// Task 3: Inference from mapped types — fromEntries
// ─────────────────────────────────────────────
// TypeScript can infer through mapped types. Write `fromEntries` so that callers
// get a properly typed result object rather than a plain Record<string, unknown>.

function fromEntries<K extends string, V>(
  entries: ReadonlyArray<readonly [K, V]>
): Record<K, V> {
  // TODO: implement using Object.fromEntries and cast the result.
  throw new Error("not implemented");
}

// Usage:
// const obj = fromEntries([["a", 1], ["b", 2]] as const);
// obj.a  // type: 1 (number when not using as const)
// obj.b  // type: 2

// ─────────────────────────────────────────────
// Task 4: Inference with generic constraints
// ─────────────────────────────────────────────

// Write `pick` with a fully inferred return type.
// The return type should be Pick<T, K>, not a plain object.
function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: readonly K[]
): Pick<T, K> {
  // TODO: implement — create a new object containing only the listed keys.
  throw new Error("not implemented");
}

// Usage:
// const user = { id: 1, name: "Alice", age: 30 };
// const partial = pick(user, ["id", "name"]);
// partial.id    // number ✓
// partial.name  // string ✓
// partial.age   // ERROR ✓ — "age" was not picked

// Write `mapValues` with a fully inferred return type.
// Every value in the output should be the return type of `fn`.
function mapValues<T extends object, U>(
  obj: T,
  fn: (value: T[keyof T], key: keyof T) => U
): Record<keyof T, U> {
  // TODO: implement — iterate over obj's entries and apply fn to each value.
  throw new Error("not implemented");
}

// Usage:
// const lengths = mapValues({ a: "hello", b: "world" }, (v) => v.length);
// lengths.a  // type: number
// lengths.b  // type: number
