# 4.1 Advanced Types

## Concepts

### Conditional Types
```ts
type IsString<T> = T extends string ? true : false;
type IsString<string>  // true
type IsString<number>  // false

// Non-nullable
type NonNullable<T> = T extends null | undefined ? never : T;
```

### Mapped Types
Transform all properties of a type:
```ts
type Optional<T> = { [K in keyof T]?: T[K] };
type Nullable<T> = { [K in keyof T]: T[K] | null };
type Getters<T> = { [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K] };
```

### Template Literal Types
```ts
type EventName<T extends string> = `on${Capitalize<T>}`;
type ClickEvent = EventName<"click">; // "onClick"

type CSSValue = `${number}px` | `${number}%` | `${number}rem`;
```

### `infer` Keyword
Extract a type from within a conditional type:
```ts
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
type FirstArg<T> = T extends (first: infer F, ...rest: any[]) => any ? F : never;

type UnwrapPromise<T> = T extends Promise<infer V> ? V : T;
```

### Discriminated Unions (deep dive)
The `never` type is useful to ensure exhaustive checks:
```ts
function assertNever(x: never): never {
  throw new Error("Unexpected value: " + x);
}

function handle(shape: Shape): number {
  switch (shape.kind) {
    case "circle": return Math.PI * shape.radius ** 2;
    case "rect": return shape.width * shape.height;
    default: return assertNever(shape); // TypeScript error if case is missed
  }
}
```

### Index Signatures
```ts
interface StringMap {
  [key: string]: string;
}

type ByKey<K extends string, V> = { [P in K]: V };
```

## Resources
- [TypeScript Handbook: Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
- [TypeScript Handbook: Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)
- [TypeScript Handbook: Template Literal Types](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html)

## Exercises
Go to the [exercises](./exercises/) folder.
