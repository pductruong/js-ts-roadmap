# 4.2 Advanced Utility Types

## Concepts

### Function-related utility types
```ts
type MyFn = (a: string, b: number) => boolean;

ReturnType<MyFn>           // boolean
Parameters<MyFn>           // [string, number]
Parameters<MyFn>[0]        // string — index into tuple

class MyClass { constructor(public x: number) {} }
ConstructorParameters<typeof MyClass>  // [number]
InstanceType<typeof MyClass>           // MyClass
```

### Awaited<T>
```ts
async function fetchData(): Promise<string[]> { return []; }
type Data = Awaited<ReturnType<typeof fetchData>>; // string[]
```

### Extract & Exclude
```ts
type Status = "pending" | "active" | "inactive" | "deleted";

Extract<Status, "active" | "pending">   // "active" | "pending"
Exclude<Status, "deleted">              // "pending" | "active" | "inactive"
NonNullable<string | null | undefined>  // string
```

### Combining Utility Types
```ts
type ApiResponse<T> = {
  data: T;
  error: string | null;
  status: number;
};

// Get just the data type from any ApiResponse
type DataOf<T> = T extends ApiResponse<infer D> ? D : never;
```

## Resources
- [TypeScript Handbook: Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)

## Exercises
Go to the [exercises](./exercises/) folder.
