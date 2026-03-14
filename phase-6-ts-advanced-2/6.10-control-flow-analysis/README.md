# 6.10 Control Flow Analysis & Type Widening

TypeScript's Control Flow Analysis (CFA) is the engine that makes the type system feel intelligent. It tracks how types change as code executes — across branches, loops, and assignments — so you get accurate types at every point without extra annotations.

---

## CFA Narrowing: How TypeScript Narrows Types

When TypeScript sees a union type like `string | null`, it does not collapse it to a single type immediately. Instead it walks the control flow graph and narrows the type at each point based on what the code guarantees at runtime.

### if / else blocks

```typescript
function greet(name: string | null) {
  if (name !== null) {
    // Here: name is `string`
    console.log(name.toUpperCase());
  } else {
    // Here: name is `null`
    console.log("Hello, stranger");
  }
  // Here: name is `string | null` again
}
```

TypeScript builds a flow node graph internally. Each branch gets its own narrowed type. After the `if/else`, the types from both branches are re-joined (unioned).

### switch blocks

```typescript
type Status = "active" | "inactive" | "pending";

function describe(status: Status): string {
  switch (status) {
    case "active":   return "Running";    // status is "active"
    case "inactive": return "Stopped";    // status is "inactive"
    case "pending":  return "Waiting";    // status is "pending"
  }
}
```

### while / do-while loops

TypeScript re-analyzes the loop body each iteration. Inside the loop body, any narrowing from the condition holds. After the loop, the type reflects that the condition was false when the loop exited.

```typescript
function readUntilDone(stream: string | null) {
  while (stream !== null) {
    // stream is `string` here
    console.log(stream.length);
    stream = getNextChunk(); // may return null
  }
  // stream is `null` here
}
```

---

## Type Guards

Type guards are runtime checks that TypeScript understands and uses to narrow types.

### `typeof` guard

```typescript
function process(value: string | number) {
  if (typeof value === "string") {
    return value.toUpperCase(); // value: string
  }
  return value.toFixed(2);     // value: number
}
```

Recognized `typeof` checks: `"string"`, `"number"`, `"boolean"`, `"bigint"`, `"symbol"`, `"object"`, `"function"`, `"undefined"`.

### `instanceof` guard

```typescript
class Cat { meow() {} }
class Dog { bark() {} }

function makeNoise(animal: Cat | Dog) {
  if (animal instanceof Cat) {
    animal.meow(); // animal: Cat
  } else {
    animal.bark(); // animal: Dog
  }
}
```

### `in` operator guard

Checks whether a property exists on an object. Narrows to types that have that property.

```typescript
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    animal.swim(); // animal: Fish
  } else {
    animal.fly();  // animal: Bird
  }
}
```

### Discriminated Unions

A discriminated union has a shared literal-typed property (the discriminant). TypeScript uses it to narrow exhaustively.

```typescript
type Circle   = { kind: "circle";   radius: number };
type Square   = { kind: "square";   side: number };
type Rectangle = { kind: "rectangle"; width: number; height: number };
type Shape = Circle | Square | Rectangle;

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle":    return Math.PI * shape.radius ** 2;
    case "square":    return shape.side ** 2;
    case "rectangle": return shape.width * shape.height;
  }
}
```

The key properties of a good discriminant:
- It must be a **literal type** (not `string` or `number`).
- It must be **present on every member** of the union.
- Each member must have a **unique** literal value for that property.

### User-Defined Type Predicates

When a built-in guard is not enough, write a function returning `value is Type`.

```typescript
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function process(value: unknown) {
  if (isString(value)) {
    console.log(value.toUpperCase()); // value: string
  }
}
```

### Assertion Functions

Assertion functions throw on failure and narrow after the call site:

```typescript
function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== "string") throw new Error("Not a string");
}

function process(value: unknown) {
  assertIsString(value);
  console.log(value.toUpperCase()); // value: string — narrowed permanently
}
```

---

## Type Widening

TypeScript does not always infer the narrowest possible type. It widens literals to their base types in many situations to avoid being overly restrictive.

### Why `let x = "hello"` is `string`, not `"hello"`

```typescript
let x = "hello";  // type: string  (widened — x can be reassigned)
const y = "hello"; // type: "hello" (not widened — y can never change)
```

With `let`, TypeScript knows the variable can be reassigned to any `string`. Keeping the type as `"hello"` would cause errors on `x = "world"`, which is valid. So TypeScript widens.

With `const`, the value can never change, so the literal type `"hello"` is safe and more precise.

The same applies to numbers, booleans, etc.:

```typescript
let n = 42;        // type: number
const m = 42;      // type: 42

let b = true;      // type: boolean
const c = true;    // type: true
```

### Array Widening

```typescript
let arr = ["a", "b"]; // type: string[]   (widened)
const arr2 = ["a", "b"]; // type: string[] (still widened — array contents can change)
```

Even `const` arrays widen element types because you can push to them.

---

## Literal Freshness and Excess Property Checking

When you write an **object literal** directly, TypeScript applies **excess property checking** (also called "freshness checking"). This catches typos in property names.

```typescript
interface Point { x: number; y: number }

// Direct assignment — excess property checking applies:
const p: Point = { x: 1, y: 2, z: 3 }; // Error: Object literal may only specify known properties

// Through a variable — excess property checking does NOT apply:
const extra = { x: 1, y: 2, z: 3 };
const p2: Point = extra; // OK — structural subtyping allows extra properties
```

This is intentional. Excess property checking only fires on "fresh" object literals because a literal created specifically for an assignment is almost certainly a mistake if it has extra properties. A variable passed around might legitimately have more properties (Liskov substitution principle).

The same applies to function arguments:

```typescript
function setPoint(p: Point) {}
setPoint({ x: 1, y: 2, z: 3 }); // Error — fresh literal
const obj = { x: 1, y: 2, z: 3 };
setPoint(obj); // OK — stale reference
```

---

## `as const` to Prevent Widening

`as const` tells TypeScript to infer the narrowest possible type and make everything `readonly`.

```typescript
const config = {
  env: "production",
  port: 3000,
} as const;
// type: { readonly env: "production"; readonly port: 3000 }

const directions = ["north", "south", "east", "west"] as const;
// type: readonly ["north", "south", "east", "west"]
```

This is essential when passing literal values to APIs that expect specific string unions:

```typescript
type Env = "development" | "production" | "test";

function start(env: Env) {}

const settings = { env: "production" }; // env: string — too wide
start(settings.env);                    // Error!

const settings2 = { env: "production" } as const; // env: "production"
start(settings2.env);                              // OK
```

---

## Narrowing Limitations: Closures and Reassignment

TypeScript's CFA tracks types through straightforward sequential code. It cannot track what happens inside closures because a closure may be called at any time — including after a reassignment has occurred.

```typescript
function demo(x: string | null) {
  if (x !== null) {
    // x is `string` here — narrowed
    setTimeout(() => {
      // But inside the closure, TypeScript cannot guarantee x is still string
      // because something might have reassigned it before setTimeout fires
      console.log(x.toUpperCase()); // x: string | null — NOT narrowed
    }, 1000);
  }
}
```

The fix: capture the narrowed value into a `const` before the closure:

```typescript
function demoFixed(x: string | null) {
  if (x !== null) {
    const captured = x; // captured: string — this const cannot be reassigned
    setTimeout(() => {
      console.log(captured.toUpperCase()); // captured: string — safe
    }, 1000);
  }
}
```

Another variant: TypeScript widens a narrowed type back to its original union if it sees any assignment inside a loop or branch that could reach the current point:

```typescript
function process(items: (string | number)[]) {
  let current: string | number = items[0];
  if (typeof current === "string") {
    // current: string
    current = items[1]; // re-assigned — narrows lost
    // current: string | number again
  }
}
```

---

## Contextual Typing

TypeScript can flow types **in the opposite direction** — from the expected type of an expression into its sub-expressions. This is called contextual typing.

```typescript
// The parameter type of the callback is inferred from the expected type of Array.prototype.map
const lengths = ["hello", "world"].map(s => s.length);
//                                       ^ s is inferred as string — no annotation needed
```

More examples:

```typescript
// Event handler — event is inferred as MouseEvent
document.addEventListener("click", event => {
  console.log(event.clientX); // event: MouseEvent
});

// Object literal in typed position
const handler: { onClick: (e: MouseEvent) => void } = {
  onClick: e => console.log(e.button), // e: MouseEvent — inferred from context
};
```

Contextual typing works for:
- Callback parameters
- Object literal properties when assigned to a typed variable
- Return values in typed functions
- Array/tuple elements when the array has a known type

---

## Quick-Reference Cheatsheet

| Pattern | What it does |
|---|---|
| `typeof x === "string"` | Narrows to `string` |
| `x instanceof Foo` | Narrows to `Foo` |
| `"prop" in x` | Narrows to types that have `prop` |
| `x !== null && x !== undefined` | Removes `null`/`undefined` |
| `if (x)` | Removes falsy types (`null`, `undefined`, `0`, `""`, `false`) |
| `x is T` return type | User-defined type predicate |
| `asserts x is T` return type | Assertion function |
| `as const` | Prevent widening, make readonly |
| `const y = x` before closure | Capture narrowed type into a `const` |
| `assertNever(x)` in `default` | Compile-time exhaustiveness check |
