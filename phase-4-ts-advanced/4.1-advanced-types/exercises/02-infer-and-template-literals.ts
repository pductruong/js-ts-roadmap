// Exercise 2: infer & Template Literal Types
// -------------------------------------------

// 2a. MyReturnType<T> — extract return type of a function (like built-in ReturnType)
type MyReturnType<T> = // YOUR CODE HERE

type R1 = MyReturnType<() => string>;           // string
type R2 = MyReturnType<(n: number) => boolean>; // boolean

// 2b. FirstParameter<T> — extract the type of the first parameter
type FirstParameter<T> = // YOUR CODE HERE

type P1 = FirstParameter<(name: string, age: number) => void>; // string
type P2 = FirstParameter<(n: number) => void>;                 // number

// 2c. Awaited<T> — recursively unwrap nested Promises (like built-in Awaited)
type MyAwaited<T> = // YOUR CODE HERE

type A1 = MyAwaited<Promise<string>>;                  // string
type A2 = MyAwaited<Promise<Promise<number>>>;         // number

// 2d. Template literal: EventHandler<T> creates "on{Event}" type
// EventHandler<"click" | "focus" | "blur"> => "onClick" | "onFocus" | "onBlur"
type EventHandler<T extends string> = // YOUR CODE HERE

type ClickHandler = EventHandler<"click">;              // "onClick"
type FormEvents = EventHandler<"submit" | "reset">;    // "onSubmit" | "onReset"

// 2e. Template literal: CSSUnit — valid CSS length value
type CSSUnit = // YOUR CODE HERE: `${number}px` | `${number}%` | `${number}rem` | `${number}em`

// 2f. Exhaustive switch with never
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "rect"; width: number; height: number }
  | { kind: "triangle"; base: number; height: number };

function assertNever(x: never): never {
  throw new Error("Unhandled case: " + JSON.stringify(x));
}

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle": return Math.PI * shape.radius ** 2;
    case "rect": return shape.width * shape.height;
    case "triangle": return 0.5 * shape.base * shape.height;
    default: return assertNever(shape); // TypeScript will error if a case is missing
  }
}

// Verify
const onEvent: EventHandler<"click"> = "onClick";
console.log(onEvent);
console.log(area({ kind: "circle", radius: 5 }).toFixed(2));    // 78.54
console.log(area({ kind: "rect", width: 4, height: 6 }));       // 24
console.log(area({ kind: "triangle", base: 6, height: 4 }));    // 12
