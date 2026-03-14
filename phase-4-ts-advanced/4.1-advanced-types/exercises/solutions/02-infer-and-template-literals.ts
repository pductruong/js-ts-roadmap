type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
type FirstParameter<T> = T extends (first: infer F, ...rest: any[]) => any ? F : never;
type MyAwaited<T> = T extends Promise<infer V> ? MyAwaited<V> : T;
type EventHandler<T extends string> = `on${Capitalize<T>}`;
type CSSUnit = `${number}px` | `${number}%` | `${number}rem` | `${number}em`;

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
    default: return assertNever(shape);
  }
}

const onEvent: EventHandler<"click"> = "onClick";
console.log(onEvent);
console.log(area({ kind: "circle", radius: 5 }).toFixed(2));
console.log(area({ kind: "rect", width: 4, height: 6 }));
console.log(area({ kind: "triangle", base: 6, height: 4 }));
