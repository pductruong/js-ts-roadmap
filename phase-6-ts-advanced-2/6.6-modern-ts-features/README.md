# 6.6 Modern TypeScript Features

## `satisfies` operator (TS 4.9)

Validates a value matches a type **without widening** the inferred type.

```ts
type Color = "red" | "green" | "blue";
type Palette = Record<string, Color | [number, number, number]>;

// Problem with regular annotation — loses specific types
const palette: Palette = {
  red: [255, 0, 0],
  green: "green",
};
palette.red;   // Color | [number,number,number] — loses tuple info

// With satisfies — validates AND keeps specific types
const palette2 = {
  red: [255, 0, 0],
  green: "green",
} satisfies Palette;
palette2.red;   // [number, number, number] — specific type kept!
palette2.red.map(v => v * 2); // OK
```

## `const` type parameters (TS 5.0)

Infer literal types in generics automatically (like `as const`):

```ts
// Without const — infers string[]
function identity<T>(arr: T[]): T[] { return arr; }
identity(["a", "b"]); // string[]

// With const — infers ["a", "b"]
function identity<const T extends readonly unknown[]>(arr: T): T { return arr; }
identity(["a", "b"]); // readonly ["a", "b"]
```

## `using` declarations (TS 5.2) — Explicit Resource Management

Auto-dispose resources when they go out of scope, like `try/finally` but cleaner:

```ts
// An object with [Symbol.dispose]() is a disposable resource
class DatabaseConnection {
  constructor(public url: string) { console.log("Connected to", url); }
  query(sql: string) { return []; }
  [Symbol.dispose]() { console.log("Connection closed"); }
}

function run() {
  using db = new DatabaseConnection("postgres://localhost/mydb");
  db.query("SELECT 1");
  // db[Symbol.dispose]() is called automatically when `run` returns or throws
}
run();

// Async version
class FileHandle {
  async [Symbol.asyncDispose]() { await this.close(); }
}
await using fh = new FileHandle();
```

## `noUncheckedIndexedAccess`

Forces you to handle `undefined` when accessing arrays or records by index:

```ts
// tsconfig: "noUncheckedIndexedAccess": true

const arr = [1, 2, 3];
const first = arr[0]; // number | undefined (not just number!)

if (first !== undefined) {
  first * 2; // OK
}

// Without the check:
arr[0] * 2; // Error: possibly undefined
```

## Resources
- [TS 4.9: satisfies](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html)
- [TS 5.0: const type parameters](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html)
- [TS 5.2: using declarations](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-2.html)

## Exercises
Go to the [exercises](./exercises/) folder.
