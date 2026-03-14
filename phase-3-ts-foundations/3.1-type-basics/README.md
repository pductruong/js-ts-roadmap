# 3.1 Type Basics

## Concepts

### Primitive Types
```ts
let name: string = "Alice";
let age: number = 30;
let active: boolean = true;
let nothing: null = null;
let missing: undefined = undefined;
let id: symbol = Symbol("id");
let big: bigint = 100n;
```

### Special Types
| Type | Use |
|---|---|
| `any` | Opt out of type checking (avoid) |
| `unknown` | Type-safe alternative to `any` — must narrow before use |
| `void` | Function returns nothing |
| `never` | Function never returns (throws or infinite loop) |

```ts
function fail(msg: string): never {
  throw new Error(msg);
}

function log(msg: string): void {
  console.log(msg);
}

let x: unknown = "hello";
if (typeof x === "string") x.toUpperCase(); // OK after narrowing
```

### Type Inference
TypeScript infers types — you don't always need annotations.
```ts
let name = "Alice";        // inferred: string
let nums = [1, 2, 3];      // inferred: number[]
const PI = 3.14;           // inferred: 3.14 (literal type)
```

### Arrays & Tuples
```ts
let nums: number[] = [1, 2, 3];
let strs: Array<string> = ["a", "b"];

// Tuple — fixed length, each position has a specific type
let pair: [string, number] = ["Alice", 30];
let [name, age] = pair;
```

### Object Types & Interfaces
```ts
type Point = { x: number; y: number };

interface User {
  name: string;
  age: number;
  email?: string; // optional
  readonly id: number; // can't be reassigned
}
```

### type vs interface
- Both can describe object shapes
- `interface` can be extended with `extends` and merged
- `type` can represent unions, intersections, primitives
- Prefer `interface` for object shapes, `type` for everything else

### Union & Intersection
```ts
type StringOrNumber = string | number;
type Admin = User & { role: "admin" };
```

### Literal Types
```ts
type Direction = "north" | "south" | "east" | "west";
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;
```

## Resources
- [TypeScript Handbook: Basic Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)
- [TypeScript Handbook: Object Types](https://www.typescriptlang.org/docs/handbook/2/objects.html)
- [TypeScript Handbook: Union Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types)
- [TypeScript Playground](https://www.typescriptlang.org/play)

## Exercises
Go to the [exercises](./exercises/) folder.
