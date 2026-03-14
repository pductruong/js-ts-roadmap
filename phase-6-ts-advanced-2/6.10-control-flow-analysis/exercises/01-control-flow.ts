// Task 1: Exhaustive switch with never
// Write a function processShape(shape: Shape) that handles all cases.
// Use a function `assertNever(x: never): never` to ensure exhaustive checking.
type Circle = { kind: 'circle'; radius: number };
type Square = { kind: 'square'; side: number };
type Triangle = { kind: 'triangle'; base: number; height: number };
type Shape = Circle | Square | Triangle;

function assertNever(x: never): never {
  // TODO: throw with descriptive message
}

function getArea(shape: Shape): number {
  // TODO: exhaustive switch using assertNever for default case
}

// Task 2: CFA with assignments
// Explain (with types) why this doesn't narrow correctly and fix it:
// function demo(x: string | null) {
//   let result = x;  // result is string | null
//   if (x !== null) {
//     setTimeout(() => {
//       console.log(result.toUpperCase()); // ERROR - why?
//     }, 0);
//   }
// }
// Write the fixed version:
function demoFixed(x: string | null): void {
  // TODO: fix the closure narrowing issue
}

// Task 3: Widening and as const
// Explain the type difference and write examples:
// let a = "hello"        // type is: ?
// const b = "hello"      // type is: ?
// let c = ["a", "b"]     // type is: ?
// const d = ["a", "b"] as const  // type is: ?
// Write a function that ONLY accepts a readonly tuple of literal strings:
type Config = readonly ["development" | "production" | "test"];
function setEnvironment(config: Config): void {
  // TODO: implement
}

// Task 4: Discriminated union narrowing
// Create a Result type and write processResult that narrows correctly:
type Success<T> = { ok: true; value: T };
type Failure = { ok: false; error: string };
type Result<T> = Success<T> | Failure;

function processResult<T>(result: Result<T>): T | null {
  // TODO: narrow using discriminant and return value or null
}
