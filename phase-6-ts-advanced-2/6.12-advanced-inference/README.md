# 6.12 Advanced Inference

Advanced TypeScript inference patterns targeting principal-level engineers. This section covers the mechanics TypeScript uses when resolving types — why certain tricks work, and how to exploit or avoid them deliberately.

---

## Bivariant Function Parameters

TypeScript's type system is intentionally unsound in one specific place: **method parameters are bivariant**.

### Method syntax vs. function property syntax

```ts
interface WithMethod {
  greet(name: string): void;      // bivariant — UNSAFE
}
interface WithFunctionProp {
  greet: (name: string) => void;  // contravariant with --strictFunctionTypes — SAFE
}
```

Function parameters should be **contravariant**: a handler for a wider type should be assignable where a handler for a narrower type is expected, but not vice-versa. Method syntax bypasses this rule entirely — TypeScript allows *both* directions (hence "bivariant") to keep compatibility with patterns like `Array.prototype.forEach`.

### `--strictFunctionTypes`

Enabled automatically by `--strict`. Applies strict contravariant checking to **function-typed properties** (arrow-syntax members, standalone `type Fn = ...`, etc.) but **not** to method-syntax members. This is a deliberate carve-out.

```ts
// With --strictFunctionTypes:
const bad: WithMethod = {
  greet(x: string | number) {}  // allowed — bivariant method
};
const good: WithFunctionProp = {
  greet(x: string | number) {}  // ERROR — parameter must be at least string, not wider
};
```

**Practical rule:** always prefer function-property syntax in interfaces when you want strict parameter checking.

---

## `infer` in Contravariant Positions

The position of `infer` determines what TypeScript does when it collects multiple candidates for the same type variable.

| Position       | Multiple candidates → |
|----------------|----------------------|
| Covariant (e.g., return type) | Union of candidates |
| Contravariant (e.g., parameter type) | **Intersection** of candidates |

### Union → Intersection trick

```ts
type UnionToIntersection<U> =
  (U extends unknown ? (x: U) => void : never) extends (x: infer I) => void
    ? I
    : never;
```

Step by step:
1. The distributive conditional `U extends unknown ? (x: U) => void : never` turns each union member `A | B | C` into `((x: A) => void) | ((x: B) => void) | ((x: C) => void)`.
2. Checking whether that union extends `(x: infer I) => void` forces TypeScript to infer `I` from a **parameter position** — contravariant.
3. With multiple candidates in a contravariant position, TypeScript intersects them: `I = A & B & C`.

This pattern is the foundation of `LastOfUnion`, tuple-from-union, and many other type-level algorithms.

---

## Contextual Typing Deep Dive

### `as const`

Widens nothing. Every value gets its literal type, arrays become `readonly` tuples.

```ts
const x = { a: 1, b: "hello" } as const;
// x: { readonly a: 1; readonly b: "hello" }
```

### `satisfies`

Validates the value against a type without *widening* the inferred type to that type. You get both validation and the narrowest possible inference.

```ts
type Palette = Record<string, { r: number; g: number; b: number }>;

const p = {
  red: { r: 255, g: 0, b: 0 },
} satisfies Palette;
// p.red is { r: number; g: number; b: number } — NOT Palette[string]
// p.notExist  // ERROR — validated against Palette
```

### Explicit type annotation

The broadest form. TypeScript widens the inferred type entirely to the declared type. Useful for intentional widening, harmful when you want to retain literal keys.

### `NoInfer<T>` (TypeScript 5.4)

Prevents a site from contributing to the inference of `T`. Without `NoInfer`, every argument annotated with `T` participates in inference:

```ts
// BAD: defaultValue widens T to string | number
function get<T>(arr: T[], defaultValue: T): T { ... }
get(["a", "b"], 42); // T inferred as string | number

// GOOD: defaultValue is checked against T but never infers it
function get<T>(arr: T[], defaultValue: NoInfer<T>): T { ... }
get(["a", "b"], 42); // ERROR — 42 is not string
```

---

## Inference from Conditional Types

When TypeScript resolves `SomeType extends Condition ? A : B`:

- **If `SomeType` is a naked type parameter**, the conditional distributes over unions.
- **If the condition contains `infer`**, TypeScript collects candidates and resolves them based on variance (see above).
- **Deferred evaluation**: when a type parameter is not yet resolved, TypeScript defers evaluation and returns the whole conditional type. Resolution happens later when the parameter is instantiated.

### Choosing a branch

TypeScript picks the true branch when the checked type is assignable to the constraint. When checking `infer` positions, assignability is tested structurally — which is why `infer` inside a function parameter extracts intersections rather than unions.

---

## Template Literal Inference

TypeScript can use `infer` inside template literal types to extract portions of string literals:

```ts
type ParseRoute<S extends string> =
  S extends `${infer Method} ${infer Path}`
    ? { method: Method; path: Path }
    : never;

type R = ParseRoute<"GET /users">;
// { method: "GET"; path: "/users" }
```

Recursive template literal inference allows parsing entire URL patterns:

```ts
type ParseParams<S extends string> =
  S extends `${string}:${infer Param}/${infer Rest}`
    ? Param | ParseParams<`/${Rest}`>
    : S extends `${string}:${infer Param}`
    ? Param
    : never;

type Params = ParseParams<"/users/:id/posts/:postId">;
// "id" | "postId"
```

Key rules:
- TypeScript matches template literals **greedily from left to right**.
- Each `infer` slot captures the minimal string that makes the rest of the pattern match.
- Recursive types are allowed as long as they ultimately bottom out.

---

## Resources

- [TypeScript Handbook: Type Inference](https://www.typescriptlang.org/docs/handbook/type-inference.html)
- [TypeScript 2.8: Conditional types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html)
- [TypeScript 5.4: NoInfer](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-4.html#the-noinfer-utility-type)
- [Bivariance hack explained — @ahejlsberg](https://github.com/microsoft/TypeScript/wiki/FAQ#why-are-function-parameters-bivariant)
- [Template Literal Types — TypeScript 4.1](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-1.html#template-literal-types)

## Exercises

Go to the [exercises](./exercises/) folder.
