# 6.4 Recursive Types

## Concepts

Recursive types are types that refer to themselves. They model naturally recursive data like trees, JSON, file systems, and deeply nested objects.

### JSON type
```ts
type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue };
```

### Deep utility types
```ts
// Deep readonly — applies Readonly recursively
type DeepReadonly<T> =
  T extends (infer E)[]
    ? ReadonlyArray<DeepReadonly<E>>
    : T extends object
    ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
    : T;

// Deep partial
type DeepPartial<T> =
  T extends object
    ? { [K in keyof T]?: DeepPartial<T[K]> }
    : T;
```

### Tree structures
```ts
type TreeNode<T> = {
  value: T;
  children: TreeNode<T>[];
};
```

### Path types (advanced)
```ts
// Get all valid dot-notation paths in an object type
type Paths<T, Prefix extends string = ""> =
  T extends object
    ? { [K in keyof T & string]:
        | `${Prefix}${K}`
        | Paths<T[K], `${Prefix}${K}.`>
      }[keyof T & string]
    : never;

type User = { name: string; address: { city: string; zip: string } };
type UserPaths = Paths<User>; // "name" | "address" | "address.city" | "address.zip"
```

## Resources
- [TypeScript Handbook: Recursive types](https://www.typescriptlang.org/docs/handbook/2/objects.html#the-readonly-modifier)
- [TypeScript: Template literal types with recursion](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html)

## Exercises
Go to the [exercises](./exercises/) folder.
