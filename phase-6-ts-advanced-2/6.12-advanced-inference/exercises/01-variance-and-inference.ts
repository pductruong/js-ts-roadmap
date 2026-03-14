// Exercise 1: Variance and Advanced Inference
// --------------------------------------------

// ─────────────────────────────────────────────
// Task 1: Bivariant method parameters
// ─────────────────────────────────────────────
// Explain the difference between these two and which is type-safe:
interface WithMethod {
  greet(name: string): void; // bivariant — UNSAFE (method syntax bypasses --strictFunctionTypes)
}
interface WithFunctionProp {
  greet: (name: string) => void; // contravariant with --strictFunctionTypes — SAFE
}

// Show that method syntax allows unsound assignments.
// Write a function demonstrating the difference:
function demonstrateBivariance() {
  // TODO: Create an object that would be accepted by WithMethod but rejected by WithFunctionProp.
  // Hint: assign a handler that accepts a broader type like string | number.
  //
  // Expected: the assignment to WithMethod compiles; the assignment to WithFunctionProp
  // produces a type error because the parameter is too wide.
  //
  // const unsound: WithMethod = { greet(x: ???) {} };
  // const safe: WithFunctionProp = { greet(x: ???) {} }; // should error
}

// ─────────────────────────────────────────────
// Task 2: Union inference from overloaded functions
// ─────────────────────────────────────────────
// TypeScript picks a single overload signature when calling an overloaded function,
// but conditional types can probe individual signatures.

function process(x: string): string;
function process(x: number): number;
function process(x: string | number): string | number {
  return x;
}

// Write a type that extracts the return type for a specific input type:
type ReturnFor<F, A> = F extends (arg: A) => infer R ? R : never;

type StringReturn = ReturnFor<typeof process, string>; // should be: string
type NumberReturn = ReturnFor<typeof process, number>; // should be: number

// ─────────────────────────────────────────────
// Task 3: Infer in contravariant position (function parameter)
// ─────────────────────────────────────────────
// When `infer` appears in a function parameter position TypeScript must satisfy
// ALL positions simultaneously → it intersects the candidates instead of unioning them.

type UnionToIntersection<U> =
  (U extends unknown ? (x: U) => void : never) extends (x: infer I) => void
    ? I
    : never;

// Test it:
type ABC = UnionToIntersection<{ a: 1 } | { b: 2 } | { c: 3 }>;
// Expected: { a: 1 } & { b: 2 } & { c: 3 }

// Now write LastOfUnion<U> that extracts the last type in a union.
// The trick: use UnionToIntersection to convert a union of function types into
// an intersection, then pick off the last overload with infer.
type LastOfUnion<U> =
  // TODO: implement using the UnionToIntersection trick.
  // Steps:
  //   1. Map each member of U to a function: (U extends unknown ? () => U : never)
  //   2. Apply UnionToIntersection to get an intersection of those functions.
  //   3. Extract the return type of the resulting intersection with `infer`.
  unknown;

// Uncomment to test once implemented:
// type Last1 = LastOfUnion<"a" | "b" | "c">; // "c"  (order is an implementation detail)
// type Last2 = LastOfUnion<1 | 2 | 3>;       // 3

// ─────────────────────────────────────────────
// Task 4: Template literal type inference
// ─────────────────────────────────────────────
// TypeScript can infer string segments from template literal patterns.

type ParseRoute<S extends string> =
  S extends `${infer Method} ${infer Path}`
    ? { method: Method; path: Path }
    : never;

type R1 = ParseRoute<"GET /users">;  // { method: "GET"; path: "/users" }
type R2 = ParseRoute<"POST /items">; // { method: "POST"; path: "/items" }

// ParseParams extracts :param names from a route path recursively:
type ParseParams<S extends string> =
  S extends `${string}:${infer Param}/${infer Rest}`
    ? Param | ParseParams<`/${Rest}`>
    : S extends `${string}:${infer Param}`
    ? Param
    : never;

type Params = ParseParams<"/users/:id/posts/:postId">; // "id" | "postId"

// Now write a typed `createRoute` function that uses ParseParams so the
// handler automatically receives the correct param names:
function createRoute<T extends string>(
  pattern: T,
  handler: (params: Record<ParseParams<T>, string>) => void
) {
  // TODO: implement — store pattern and handler; call handler with parsed params from a URL.
  // For this exercise, parsing can be a simple split on "/" and ":" — the interesting part
  // is that TypeScript enforces the param names at the call site.
  return { pattern, handler };
}

// Uncomment to test once implemented:
// const route = createRoute("/users/:id/posts/:postId", (params) => {
//   console.log(params.id);     // OK
//   console.log(params.postId); // OK
//   // console.log(params.foo); // ERROR — "foo" is not a key
// });
