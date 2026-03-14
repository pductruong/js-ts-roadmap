// ============================================================
// Task 1: Contextual typing
// ============================================================

// Contextual typing: TypeScript flows the expected type *into* sub-expressions.
// Here, Array<number>.map expects a callback `(value: number, ...) => U`, so
// TypeScript infers `n` as `number` without any annotation.
const numbers = [1, 2, 3];
const doubled = numbers.map(n => n * 2); // n: number — inferred from context

/**
 * pipe2 composes two functions, threading the output type of `f` into the
 * input type of `g`.
 *
 * How generics flow here:
 *   1. TypeScript infers A from the actual argument of the returned function.
 *   2. B is inferred from the return type of f — which is also constrained to
 *      be the parameter type of g.
 *   3. C is inferred from the return type of g.
 *
 * The caller never needs to write type arguments explicitly:
 *   const addThenString = pipe2((x: number) => x + 1, n => n.toString());
 *   // addThenString: (a: number) => string
 */
function pipe2<A, B, C>(f: (a: A) => B, g: (b: B) => C): (a: A) => C {
  return (a: A) => g(f(a));
}

// Examples:
const addThenString = pipe2((x: number) => x + 1, n => n.toString());
console.log(addThenString(4)); // "5"

const parseThenDouble = pipe2((s: string) => parseInt(s, 10), n => n * 2);
console.log(parseThenDouble("21")); // 42

// ============================================================
// Task 2: Excess property checking
// ============================================================

// WHY `{ x: 1, y: 2, z: 3 }` fails when assigned directly to `Point`:
//
//   TypeScript applies "excess property checking" (freshness checking) only on
//   FRESH object literals — i.e., object literals written directly at the
//   assignment site. A fresh literal is almost certainly a mistake if it has
//   extra properties that the target type doesn't declare.
//
// WHY assigning through a variable is OK:
//
//   const p2 = { x: 1, y: 2, z: 3 };  // type: { x: number; y: number; z: number }
//   const p3: Point = p2;              // OK — structural subtyping, not freshness
//
//   p2's type is structurally compatible with Point (it has x and y). The
//   freshness check only fires at the literal creation site, not when an
//   existing variable is passed around. This models the Liskov substitution
//   principle: an object can always have more properties than a type requires.

interface Point { x: number; y: number }

// Exact<T, U> maps over U's keys and sets any key NOT in T to `never`.
// When you pass { x: 1, y: 2, z: 3 }, the resulting type has z: never,
// which makes it impossible to satisfy, forcing a compile error.
type Exact<T, U extends T> = T extends object
  ? { [K in keyof U]: K extends keyof T ? T[K] : never }
  : T;

function createPoint<T extends Point>(p: Exact<Point, T>): Point {
  return { x: p.x, y: p.y };
}

// These work:
const a = createPoint({ x: 1, y: 2 });

// This would fail even through a variable because z becomes `never`:
// const extra = { x: 1, y: 2, z: 3 };
// createPoint(extra); // Error: z is `never`, can't assign `number` to `never`

// ============================================================
// Task 3: Narrowing with type predicates vs assertions
// ============================================================

/**
 * Version A — Type Predicate: `value is T`
 *
 * The function *returns* a boolean. The predicate narrows the type of `value`
 * only *inside the caller's `if` branch*. The function itself is fallible and
 * the caller decides what to do on false.
 *
 * Use when: you want to check and branch — you handle both the truthy and
 * falsy paths.
 */
function isNonNull<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

/**
 * Version B — Assertion Function: `asserts value is T`
 *
 * The function does NOT return a boolean — it either throws or returns `void`.
 * After the call, TypeScript permanently narrows `value` for the rest of the
 * enclosing scope (not just in an if-branch). If the value is wrong at runtime
 * the function throws immediately, so you never reach the narrowed code with a
 * bad value.
 *
 * Use when: the value MUST be non-null for the program to proceed — failure is
 * a bug, not a recoverable condition.
 */
function assertNonNull<T>(value: T | null | undefined, name: string): asserts value is T {
  if (value === null || value === undefined) {
    throw new Error(`Expected '${name}' to be non-null, got ${value}`);
  }
}

// Demonstration — type predicate (caller controls both branches):
function demoPredicates(raw: string | null) {
  if (isNonNull(raw)) {
    console.log(raw.toUpperCase()); // raw: string
  } else {
    console.log("was null or undefined");
  }
}

// Demonstration — assertion function (narrows past the call):
function demoAssertions(raw: string | null) {
  assertNonNull(raw, "raw");
  // From here on, raw is `string` — TypeScript knows the function threw above
  // if it was null.
  console.log(raw.toUpperCase()); // raw: string
}

// ============================================================
// Task 4: CFA with truthiness
// ============================================================

function processValue(value: string | 0 | false | null | undefined) {
  if (value) {
    // Type of value here: string
    //
    // TypeScript removes all falsy members from the union when the truthiness
    // check passes:
    //   - 0        is always falsy  → removed
    //   - false    is always falsy  → removed
    //   - null     is always falsy  → removed
    //   - undefined is always falsy → removed
    //   - string   can be falsy (empty string "") but TypeScript keeps it
    //              because a non-empty string is truthy and it can't statically
    //              inspect the value. The type stays `string`, not `""`.
    //              (Only the literal type `""` would be removed.)
    //
    // Result: value is `string` (the only remaining member that can be truthy)
    return value.toUpperCase();
  }

  // Type of value here: string | 0 | false | null | undefined
  //
  // In the else branch, TypeScript knows the truthiness check failed, but it
  // cannot remove `string` entirely — an empty string `""` is falsy and is
  // still a valid `string`. So `string` remains in the union alongside the
  // definitively-falsy types (0, false, null, undefined).
  //
  // If the union had been `"" | 0 | false | null | undefined` (only the empty
  // string literal), TypeScript WOULD narrow `string` out in the else branch.
  return null;
}

console.log(processValue("hello")); // "HELLO"
console.log(processValue(""));      // null — empty string is falsy
console.log(processValue(0));       // null
console.log(processValue(null));    // null
