// Solution 1: Variance and Advanced Inference
// --------------------------------------------

// ─────────────────────────────────────────────
// Task 1: Bivariant method parameters
// ─────────────────────────────────────────────
interface WithMethod {
  greet(name: string): void; // bivariant — method syntax bypasses --strictFunctionTypes
}
interface WithFunctionProp {
  greet: (name: string) => void; // strict contravariant checking with --strictFunctionTypes
}

function demonstrateBivariance() {
  // This compiles because method parameters are bivariant.
  // The handler accepts `string | number`, which is *wider* than `string`.
  // Under strict contravariance this would be a type error (a narrower caller
  // could pass a plain `string`, but the handler expects it may also be `number`).
  const unsound: WithMethod = {
    greet(x: string | number) {
      // Imagining the caller passes a string, this code is sound.
      // But TypeScript does NOT catch it on method syntax — bivariant.
      console.log(x);
    },
  };

  // With --strictFunctionTypes this is a compile error:
  // Argument of type '(x: string | number) => void' is not assignable to
  // parameter of type '(name: string) => void'.
  //   Types of parameters 'x' and 'name' are incompatible.
  //     Type 'string' is not assignable to type 'string | number'. ← wrong direction
  //
  // const broken: WithFunctionProp = {
  //   greet(x: string | number) { console.log(x); } // ERROR
  // };

  // A handler with an *equal or narrower* parameter is fine:
  const ok: WithFunctionProp = {
    greet(x: string) {
      console.log(x.toUpperCase());
    },
  };

  unsound.greet("hello");
  ok.greet("world");
}

demonstrateBivariance();

// ─────────────────────────────────────────────
// Task 2: Union inference from overloaded functions
// ─────────────────────────────────────────────
function process(x: string): string;
function process(x: number): number;
function process(x: string | number): string | number {
  return x;
}

// ReturnFor probes a single call signature by placing `infer` in return position
// (covariant). When TypeScript checks `typeof process` against `(arg: string) => infer R`,
// it matches the first overload and infers R = string.
type ReturnFor<F, A> = F extends (arg: A) => infer R ? R : never;

type StringReturn = ReturnFor<typeof process, string>;
// type: string

type NumberReturn = ReturnFor<typeof process, number>;
// type: number

// ─────────────────────────────────────────────
// Task 3: Infer in contravariant position (function parameter)
// ─────────────────────────────────────────────

// How UnionToIntersection works — step by step:
//
//   Input: { a: 1 } | { b: 2 } | { c: 3 }
//
//   Step 1 — distributive conditional turns each member into a function type:
//     ((x: { a: 1 }) => void) | ((x: { b: 2 }) => void) | ((x: { c: 3 }) => void)
//
//   Step 2 — checking that union extends (x: infer I) => void forces `I` to be inferred
//     from a *parameter* position, which is contravariant. TypeScript must find a single
//     type I such that I is assignable to each of { a: 1 }, { b: 2 }, { c: 3 }.
//     The only type satisfying all three simultaneously is their intersection.
//
//   Result: { a: 1 } & { b: 2 } & { c: 3 }
type UnionToIntersection<U> =
  (U extends unknown ? (x: U) => void : never) extends (x: infer I) => void
    ? I
    : never;

type ABC = UnionToIntersection<{ a: 1 } | { b: 2 } | { c: 3 }>;
// type: { a: 1 } & { b: 2 } & { c: 3 }

// LastOfUnion — extracts the last type in a union.
//
// How it works:
//   1. Map each union member to a zero-argument function returning that member:
//      (() => "a") | (() => "b") | (() => "c")
//   2. Apply UnionToIntersection to get an overloaded function intersection:
//      (() => "a") & (() => "b") & (() => "c")
//   3. Extract the return type of that intersection with `infer R`.
//      When multiple overloads exist, TypeScript resolves the *last* overload
//      in the intersection, so R = "c" (the last union member in internal order).
type LastOfUnion<U> =
  UnionToIntersection<
    U extends unknown ? () => U : never
  > extends () => infer R
    ? R
    : never;

type Last1 = LastOfUnion<"a" | "b" | "c">;
// type: "c"  (internal union order; deterministic within a single TS version)

type Last2 = LastOfUnion<1 | 2 | 3>;
// type: 3

// ─────────────────────────────────────────────
// Task 4: Template literal type inference
// ─────────────────────────────────────────────

type ParseRoute<S extends string> =
  S extends `${infer Method} ${infer Path}`
    ? { method: Method; path: Path }
    : never;

type R1 = ParseRoute<"GET /users">;
// type: { method: "GET"; path: "/users" }

type R2 = ParseRoute<"POST /items">;
// type: { method: "POST"; path: "/items" }

// Recursive template literal inference:
// The first branch matches paths that still have segments after the current param.
// The recursive call re-prefixes the remaining string with "/" so the pattern keeps working.
type ParseParams<S extends string> =
  S extends `${string}:${infer Param}/${infer Rest}`
    ? Param | ParseParams<`/${Rest}`>
    : S extends `${string}:${infer Param}`
    ? Param
    : never;

type Params = ParseParams<"/users/:id/posts/:postId">;
// type: "id" | "postId"

// A runtime helper that parses actual URL segments (simple implementation).
function extractParams(pattern: string, url: string): Record<string, string> {
  const patternParts = pattern.split("/");
  const urlParts = url.split("/");
  const result: Record<string, string> = {};
  for (let i = 0; i < patternParts.length; i++) {
    const seg = patternParts[i];
    if (seg && seg.startsWith(":")) {
      result[seg.slice(1)] = urlParts[i] ?? "";
    }
  }
  return result;
}

// createRoute — the return type of handler's `params` is inferred from `pattern`.
function createRoute<T extends string>(
  pattern: T,
  handler: (params: Record<ParseParams<T>, string>) => void
) {
  return {
    pattern,
    handler,
    // Simulate matching an incoming URL and calling the handler.
    match(url: string) {
      const params = extractParams(pattern, url) as Record<ParseParams<T>, string>;
      handler(params);
    },
  };
}

// Usage — TypeScript enforces that only valid param names are accessed:
const userPostRoute = createRoute(
  "/users/:id/posts/:postId",
  (params) => {
    console.log("user:", params.id);      // OK — "id" is a valid param
    console.log("post:", params.postId);  // OK — "postId" is a valid param
    // params.foo would be a compile error — "foo" is not a key of Record<"id" | "postId", string>
  }
);

userPostRoute.match("/users/42/posts/7");
// Logs:
//   user: 42
//   post: 7
