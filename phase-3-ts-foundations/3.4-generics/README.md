# 3.4 Generics

## Concepts

### Generic Functions
```ts
function identity<T>(value: T): T {
  return value;
}
identity<string>("hello"); // explicit
identity(42);              // inferred: identity<number>
```

### Generic Constraints
```ts
function getLength<T extends { length: number }>(value: T): number {
  return value.length;
}
getLength("hello");  // 5
getLength([1, 2, 3]); // 3
// getLength(42);    // Error: number has no length
```

### Generic Classes
```ts
class Box<T> {
  constructor(private value: T) {}
  getValue(): T { return this.value; }
  map<U>(fn: (val: T) => U): Box<U> {
    return new Box(fn(this.value));
  }
}
```

### Built-in Utility Types
```ts
type User = { id: number; name: string; email: string; age: number };

Partial<User>     // all properties optional
Required<User>    // all properties required
Readonly<User>    // all properties readonly
Pick<User, "id" | "name">   // only id and name
Omit<User, "email">         // everything except email
Record<string, number>      // { [key: string]: number }
```

## Resources
- [TypeScript Handbook: Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)
- [TypeScript Handbook: Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)

## Exercises
Go to the [exercises](./exercises/) folder.
