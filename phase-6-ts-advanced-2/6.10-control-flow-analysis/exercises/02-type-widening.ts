// Task 1: Contextual typing
// Show how contextual typing works - TypeScript infers parameter types from context
// Complete these so TypeScript infers the types without annotations:
const numbers = [1, 2, 3];
const doubled = numbers.map(n => n * 2); // n is inferred as number

// Write a higher-order function `pipe2` where the second function's input type
// is inferred from the first function's output type:
function pipe2<A, B, C>(f: (a: A) => B, g: (b: B) => C): (a: A) => C {
  // TODO: implement
}

// Task 2: Excess property checking
// Explain why this fails and fix it:
interface Point { x: number; y: number }
// const p: Point = { x: 1, y: 2, z: 3 }; // Error!
// const p2 = { x: 1, y: 2, z: 3 };
// const p3: Point = p2; // OK! Why?

// Write a strict version that prevents excess properties even through variable assignment:
type Exact<T, U extends T> = T extends object
  ? { [K in keyof U]: K extends keyof T ? T[K] : never }
  : T;

function createPoint<T extends Point>(p: Exact<Point, T>): Point {
  // TODO: implement
}

// Task 3: Narrowing with type predicates vs assertions
// Write both versions for the same check and explain the difference:
// Version A - type predicate (narrows in caller)
function isNonNull<T>(value: T | null | undefined): value is T {
  // TODO: implement
}
// Version B - assertion function (throws if wrong, narrows after call)
function assertNonNull<T>(value: T | null | undefined, name: string): asserts value is T {
  // TODO: implement
}

// Task 4: CFA with truthiness
// TypeScript narrows with truthiness checks. Complete these:
function processValue(value: string | 0 | false | null | undefined) {
  if (value) {
    // What is the type of value here? Add a comment with the answer
    // TODO: use value as narrowed type
    return value.toUpperCase();
  }
  // What is the type of value here? Add a comment
  return null;
}
