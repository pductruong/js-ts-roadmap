# 6.5 Type-level Programming

## Concepts

TypeScript's type system is Turing-complete. You can write algorithms that run entirely at the type level — computed at compile time with zero runtime cost.

### Techniques used
- Conditional types: `T extends U ? X : Y`
- Recursive types
- Template literal types
- Variadic tuple types
- `infer` for pattern matching

### String manipulation at type level
```ts
type Split<S extends string, Sep extends string> =
  S extends `${infer Head}${Sep}${infer Tail}`
    ? [Head, ...Split<Tail, Sep>]
    : [S];

type Parts = Split<"a,b,c", ",">; // ["a", "b", "c"]
```

### Tuple operations
```ts
type Length<T extends readonly unknown[]> = T["length"];
type Head<T extends readonly unknown[]> = T extends [infer H, ...unknown[]] ? H : never;
type Tail<T extends readonly unknown[]> = T extends [unknown, ...infer T] ? T : never;
type Concat<A extends readonly unknown[], B extends readonly unknown[]> = [...A, ...B];
```

### Number operations (via tuple length)
```ts
type BuildTuple<N extends number, T extends unknown[] = []> =
  T["length"] extends N ? T : BuildTuple<N, [...T, unknown]>;

type Add<A extends number, B extends number> =
  [...BuildTuple<A>, ...BuildTuple<B>]["length"];

type Add3and4 = Add<3, 4>; // 7
```

## Resources
- [Type Challenges](https://github.com/type-challenges/type-challenges) <- highly recommended practice
- [TypeScript: Template literal types](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html)

## Exercises
Go to the [exercises](./exercises/) folder.
