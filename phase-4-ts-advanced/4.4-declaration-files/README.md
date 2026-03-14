# 4.4 Declaration Files

## Concepts

Declaration files (`.d.ts`) describe the shape of JavaScript code to TypeScript without providing an implementation.

### Why they matter
- Every `@types/` package (e.g. `@types/node`) is a collection of `.d.ts` files
- If a library has no types, you write your own `.d.ts`
- You can extend existing types using **module augmentation**

### Basic `.d.ts` structure
```ts
// my-lib.d.ts
declare function greet(name: string): string;
declare const PI: number;
declare class Calculator {
  add(a: number, b: number): number;
}
export { greet, PI, Calculator };
```

### Module augmentation — extend an existing type
```ts
// extend the global String interface
declare global {
  interface String {
    toSlug(): string;
  }
}
```

### Ambient declarations
```ts
// Tell TS that a global variable exists (e.g. from a CDN script)
declare const __APP_VERSION__: string;
declare const ENV: "development" | "production" | "test";
```

## Resources
- [TypeScript Handbook: Declaration Files](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html)
- [TypeScript Handbook: Module Augmentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html)

## Exercises
Go to the [exercises](./exercises/) folder.
