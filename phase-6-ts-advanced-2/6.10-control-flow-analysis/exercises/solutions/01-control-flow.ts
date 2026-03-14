// ============================================================
// Task 1: Exhaustive switch with never
// ============================================================

type Circle = { kind: 'circle'; radius: number };
type Square = { kind: 'square'; side: number };
type Triangle = { kind: 'triangle'; base: number; height: number };
type Shape = Circle | Square | Triangle;

/**
 * assertNever is the canonical exhaustiveness guard.
 *
 * How it works:
 *   - The parameter is typed `never`.
 *   - If all union members have been handled by the switch above, TypeScript
 *     knows x truly cannot reach this point, so it accepts `x` as `never`.
 *   - If you add a new Shape member and forget a case, TypeScript infers x as
 *     the unhandled member type (e.g. `Rectangle`) and flags a compile error
 *     because `Rectangle` is not assignable to `never`.
 */
function assertNever(x: never): never {
  throw new Error(`Unhandled case: ${JSON.stringify(x)}`);
}

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2;
    case 'square':
      return shape.side ** 2;
    case 'triangle':
      return 0.5 * shape.base * shape.height;
    default:
      // If Shape gains a new member and this case is forgotten, TypeScript
      // will produce: "Argument of type 'NewMember' is not assignable to
      // parameter of type 'never'."
      return assertNever(shape);
  }
}

// Verify:
console.log(getArea({ kind: 'circle', radius: 5 }));          // ~78.54
console.log(getArea({ kind: 'square', side: 4 }));            // 16
console.log(getArea({ kind: 'triangle', base: 6, height: 3 })); // 9

// ============================================================
// Task 2: CFA with assignments — closure narrowing limitation
// ============================================================

// WHY the original fails:
//
//   function demo(x: string | null) {
//     let result = x;        // result: string | null
//     if (x !== null) {
//       setTimeout(() => {
//         console.log(result.toUpperCase()); // Error: result may be null
//       }, 0);
//     }
//   }
//
// TypeScript narrows `x` to `string` inside the if-block, but `result` is a
// *separate mutable variable* that was assigned before the check. TypeScript
// cannot narrow `result` based on a check that was performed on `x`, because
// `result` could have been reassigned between the check and when the closure
// fires. Even if it hasn't been reassigned in this code, TypeScript applies
// the conservative rule: mutable variables referenced inside closures keep
// their widened type (`string | null`).
//
// The fix: capture the narrowed value into a `const` before entering the
// closure. A `const` cannot be reassigned, so TypeScript keeps its narrowed
// type (`string`) permanently.

function demoFixed(x: string | null): void {
  if (x !== null) {
    const captured = x; // captured: string — const, cannot be reassigned
    setTimeout(() => {
      // TypeScript is happy: captured is definitively `string`
      console.log(captured.toUpperCase());
    }, 0);
  }
}

// ============================================================
// Task 3: Widening and as const
// ============================================================

// Type annotations (answers):
//
//   let a = "hello"              // type: string   — let allows reassignment → widened
//   const b = "hello"            // type: "hello"  — const, value can't change → literal kept
//   let c = ["a", "b"]           // type: string[] — elements can change → widened
//   const d = ["a", "b"] as const // type: readonly ["a", "b"] — immutable tuple of literals

const _a_example = (() => {
  let a = "hello";               // string
  const b = "hello";             // "hello"
  let c = ["a", "b"];            // string[]
  const d = ["a", "b"] as const; // readonly ["a", "b"]
  return { a, b, c, d };
})();

// The Config tuple forces the caller to pass a specific readonly literal tuple.
// Passing a plain `string[]` or mutable tuple won't work — the caller must use
// `as const` or write the literal inline.
type Config = readonly ["development" | "production" | "test"];

function setEnvironment(config: Config): void {
  console.log(`Environment set to: ${config[0]}`);
}

// Usage examples:
const envConfig = ["production"] as const satisfies Config;
setEnvironment(envConfig);          // OK
setEnvironment(["development"]);    // OK — fresh readonly literal inferred correctly

// This would be an error (wrong element value):
// setEnvironment(["staging"]);

// ============================================================
// Task 4: Discriminated union narrowing
// ============================================================

type Success<T> = { ok: true; value: T };
type Failure = { ok: false; error: string };
type Result<T> = Success<T> | Failure;

/**
 * The discriminant is the `ok` boolean literal.
 *
 * Inside `if (result.ok)`:
 *   - result is narrowed to `Success<T>` — `result.value` is accessible.
 *
 * Inside `else`:
 *   - result is narrowed to `Failure` — `result.error` is accessible.
 */
function processResult<T>(result: Result<T>): T | null {
  if (result.ok) {
    // result: Success<T>
    console.log("Success:", result.value);
    return result.value;
  } else {
    // result: Failure
    console.error("Failure:", result.error);
    return null;
  }
}

// Verify:
const good: Result<number> = { ok: true, value: 42 };
const bad: Result<number> = { ok: false, error: "Something went wrong" };

console.log(processResult(good)); // 42
console.log(processResult(bad));  // null
