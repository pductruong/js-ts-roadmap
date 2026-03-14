# 6.2 Type Predicates & Assertion Functions

## Concepts

### Type Predicates (`value is Type`)
A function that returns a **type predicate** narrows the type in the calling scope when it returns `true`.

```ts
// Returns boolean — no narrowing
function isString(v: unknown): boolean { return typeof v === "string"; }

// Returns type predicate — TypeScript narrows
function isString(v: unknown): v is string { return typeof v === "string"; }

const val: unknown = "hello";
if (isString(val)) {
  val.toUpperCase(); // OK — narrowed to string
}
```

### Array.filter with predicates
```ts
const mixed: (string | null)[] = ["a", null, "b", null];

// Without predicate: returns (string | null)[]
mixed.filter(x => x !== null);

// With predicate: returns string[]
mixed.filter((x): x is string => x !== null);
```

### Assertion Functions (`asserts value is Type`)
Instead of returning boolean — **throws** if the assertion fails. TypeScript narrows after the call.

```ts
function assertIsString(v: unknown): asserts v is string {
  if (typeof v !== "string") throw new TypeError(`Expected string, got ${typeof v}`);
}

function assertDefined<T>(v: T): asserts v is NonNullable<T> {
  if (v == null) throw new Error("Expected non-null");
}

// `asserts condition` — no type narrowing, just throws if false
function assert(condition: boolean, msg: string): asserts condition {
  if (!condition) throw new Error(msg);
}
```

## Resources
- [TypeScript: Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)
- [TypeScript: Type predicates](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates)
- [TypeScript: Assertion functions](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#assertion-functions)

## Exercises
Go to the [exercises](./exercises/) folder.
