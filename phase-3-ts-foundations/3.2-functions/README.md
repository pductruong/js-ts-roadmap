# 3.2 Functions in TypeScript

## Concepts

### Parameter & Return Types
```ts
function add(a: number, b: number): number {
  return a + b;
}

// Arrow function
const multiply = (a: number, b: number): number => a * b;
```

### Optional & Default Parameters
```ts
function greet(name: string, greeting: string = "Hello"): string {
  return `${greeting}, ${name}`;
}

function log(message: string, level?: string): void {
  console.log(`[${level ?? "info"}] ${message}`);
}
```

### Function Types
```ts
type Transformer = (value: string) => string;
type Predicate<T> = (item: T) => boolean;

const transform: Transformer = (s) => s.toUpperCase();
```

### Function Overloads
When a function behaves differently based on input types:
```ts
function format(value: string): string;
function format(value: number): string;
function format(value: string | number): string {
  if (typeof value === "string") return value.toUpperCase();
  return value.toFixed(2);
}
```

### void vs never
```ts
function logMessage(msg: string): void { console.log(msg); }
function fail(msg: string): never { throw new Error(msg); }
function infinite(): never { while (true) {} }
```

## Resources
- [TypeScript Handbook: Functions](https://www.typescriptlang.org/docs/handbook/2/functions.html)
- [TypeScript Handbook: More on Functions](https://www.typescriptlang.org/docs/handbook/2/functions.html)

## Exercises
Go to the [exercises](./exercises/) folder.
