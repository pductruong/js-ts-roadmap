# 6.11 Type System Features

This section covers the structural mechanisms TypeScript provides to extend, augment, and organise types across files and packages — declaration merging, mapped type modifiers, ambient declarations, triple-slash directives, and namespaces vs modules.

---

## Declaration Merging

Declaration merging is TypeScript's rule for combining multiple declarations that share the same name into a single type.

### Interface Merging

Multiple `interface` declarations with the same name are automatically merged into one effective type. All members from all declarations are required.

```typescript
interface Config {
  host: string;
  port: number;
}
interface Config {
  timeout: number;
}
// Effective type: { host: string; port: number; timeout: number }
```

Rules:
- Non-function members: must have the same type in each declaration or TypeScript errors.
- Function members: are overloaded — later declarations' signatures come first in the merged overload list.
- This is the mechanism behind module augmentation (extending third-party interfaces).

### Namespace Merging

Namespaces with the same name merge their exported members:

```typescript
namespace Animals {
  export class Cat {}
}
namespace Animals {
  export class Dog {}
}
// Both Cat and Dog are accessible as Animals.Cat, Animals.Dog
```

### Function + Namespace Merging

A function and a namespace with the same name merge, giving the function callable behavior AND attached properties:

```typescript
function greet(name: string): string {
  return `Hello, ${name}`;
}
namespace greet {
  export function formal(name: string): string {
    return `Good day, ${name}`;
  }
  export const version = "1.0";
}

greet("Alice");          // "Hello, Alice"
greet.formal("Alice");   // "Good day, Alice"
greet.version;           // "1.0"
```

This pattern is used extensively in the standard library — `Math`, `Array`, `Object` are all function+namespace merges.

### Class + Namespace Merging

You can attach static-like utilities to a class via namespace merging:

```typescript
class Color {
  constructor(public r: number, public g: number, public b: number) {}
}
namespace Color {
  export const RED = new Color(255, 0, 0);
  export function fromHex(hex: string): Color { /* ... */ }
}

const red = Color.RED;                // static-like
const custom = Color.fromHex("#ff0"); // factory
```

---

## Mapped Type Modifiers

Mapped types let you transform every property of a type. Modifiers control optionality (`?`) and mutability (`readonly`).

### Basic mapped type

```typescript
type Mapped<T> = {
  [K in keyof T]: T[K];
};
```

### Adding modifiers (`+`)

`+` is the default and can be omitted:

```typescript
type MyReadonly<T> = {
  +readonly [K in keyof T]: T[K]; // same as: readonly [K in keyof T]: T[K]
};
type MyPartial<T> = {
  [K in keyof T]+?: T[K]; // same as: [K in keyof T]?: T[K]
};
```

### Removing modifiers (`-`)

Prefix with `-` to strip an existing modifier:

```typescript
type Mutable<T> = {
  -readonly [K in keyof T]: T[K]; // removes readonly
};
type MyRequired<T> = {
  [K in keyof T]-?: T[K]; // removes optional (the ?)
};
```

This is exactly how the built-in `Required<T>` and `Readonly<T>` are defined in TypeScript's `lib.d.ts`.

### Combining modifiers

```typescript
type ReadonlyRequired<T> = {
  +readonly [K in keyof T]-?: T[K]; // readonly AND required
};
```

### Key remapping with `as`

TypeScript 4.1+ allows remapping keys:

```typescript
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

type User = { name: string; age: number };
type UserGetters = Getters<User>;
// { getName: () => string; getAge: () => number }
```

---

## Ambient Modules

Ambient declarations describe the *shape* of things that exist at runtime but are not defined in TypeScript source — external packages, global scripts, asset imports, etc.

### Declaring an untyped npm package

Create a `.d.ts` file (often `src/types/vendor.d.ts`):

```typescript
declare module 'fast-math' {
  export function add(a: number, b: number): number;
  export const PI: number;
}
```

### Wildcard module declarations

Useful for non-JS imports (CSS modules, images, etc.):

```typescript
declare module '*.svg' {
  const content: string;
  export default content;
}
declare module '*.css' {
  const styles: Record<string, string>;
  export default styles;
}
```

### Global augmentation with `declare global`

Inside a module file (one that has `import`/`export`), use `declare global` to add to the global scope:

```typescript
// src/types/globals.d.ts
export {}; // makes this a module

declare global {
  interface Window {
    __APP_VERSION__: string;
  }
  function trackEvent(name: string, data?: Record<string, unknown>): void;
}
```

In a plain `.d.ts` file (no imports/exports), you can declare globals directly without `declare global`.

### Module augmentation

Extend an existing third-party module's types:

```typescript
// Augment axios to add a custom config option
import 'axios';

declare module 'axios' {
  interface AxiosRequestConfig {
    _retry?: boolean;
  }
}
```

---

## Triple-Slash Directives

Triple-slash directives are single-line comments at the top of a file that act as compile-time instructions to the TypeScript compiler. They must appear before any statements.

### `/// <reference types="..." />`

Includes a type definition package (from `node_modules/@types`):

```typescript
/// <reference types="node" />
/// <reference types="jest" />
```

This is equivalent to adding `"types": ["node", "jest"]` in `tsconfig.json`. Prefer `tsconfig.json` for project-wide types; use the directive in `.d.ts` files that specifically need a type package.

### `/// <reference path="..." />`

Creates a file dependency, telling the compiler to also include the referenced file:

```typescript
/// <reference path="../types/globals.d.ts" />
```

This was common before modules. In modern TypeScript with `"moduleResolution": "bundler"` or `"node16"`, modules handle this automatically. Still used in declaration files and legacy projects.

### `/// <reference lib="..." />`

Includes a built-in lib file:

```typescript
/// <reference lib="es2017.object" />
```

---

## Namespace vs Module

### Modules (preferred in modern TypeScript)

A module is any file with at least one `import` or `export`. All names are scoped to the file — nothing leaks to the global scope. Use modules for all application code.

```typescript
// math.ts
export function add(a: number, b: number): number { return a + b; }
export const PI = 3.14159;
```

### Namespaces (legacy / specific use cases)

Namespaces (`namespace Foo {}`) create a named scope that can span multiple files (with triple-slash references). They predate ES modules. Today, namespaces are best used for:

1. **Grouping types in `.d.ts` files** without creating module boundaries.
2. **Attaching sub-types to a class or function** (function+namespace merge).
3. **Large ambient declaration files** that need to organise many types.

```typescript
// Namespace — global scope, no import needed (in a script context)
namespace Utils {
  export function clamp(n: number, min: number, max: number): number {
    return Math.min(Math.max(n, min), max);
  }
}
Utils.clamp(5, 0, 10);
```

### When to use which

| Situation | Use |
|---|---|
| Application code | Module (`import`/`export`) |
| Library type definitions | Module (`.d.ts`) or `export namespace` |
| Augmenting third-party types | Module augmentation (`declare module`) |
| Global browser scripts | `namespace` or `declare global` |
| Attaching properties to a function/class | Function/class + namespace merge |

### `export namespace` inside a module

You can use namespaces as a grouping mechanism inside a module:

```typescript
// validators.ts
export namespace Validators {
  export function isEmail(s: string): boolean { return s.includes("@"); }
  export function isURL(s: string): boolean { return s.startsWith("http"); }
}
```

This is purely a namespacing convenience — the module itself still uses `import`/`export`.

---

## Module Augmentation: Extending Third-Party Types

Module augmentation lets you extend the types of any imported module without forking it.

### Pattern

```typescript
// In your own .d.ts or .ts file:
import 'some-library';

declare module 'some-library' {
  interface SomeInterface {
    myCustomProp: string; // merged into the existing interface
  }
}
```

### Common use case: Express `Request`

```typescript
// src/types/express.d.ts
import 'express';

declare module 'express' {
  interface Request {
    user?: { id: string; email: string };
    requestId?: string;
  }
}
```

### Common use case: extending a class

```typescript
declare module 'some-orm' {
  interface Model {
    softDelete(): Promise<void>; // adds method to all models
  }
}
```

Rules:
- You can only add new members — you cannot change existing member types.
- The augmentation file must be a module (have at least one `import`/`export`).
- The augmentation is merged at compile time only; you must provide the runtime implementation separately.

---

## Quick-Reference Cheatsheet

| Feature | Syntax | Use case |
|---|---|---|
| Interface merge | multiple `interface Foo {}` | Extend interfaces across files |
| Namespace merge | multiple `namespace Foo {}` | Group utilities |
| Function+namespace | `function f(){}` + `namespace f{}` | Attach properties to functions |
| Remove optional | `-?` in mapped type | Implement `Required<T>` |
| Remove readonly | `-readonly` in mapped type | Implement `Mutable<T>` |
| Ambient module | `declare module 'pkg' {}` | Type untyped npm packages |
| Global augmentation | `declare global {}` inside module | Add to `Window`, `globalThis` |
| Module augmentation | `declare module 'pkg' {}` + import | Extend third-party types |
| Reference types | `/// <reference types="node" />` | Pull in `@types/*` packages |
| Reference path | `/// <reference path="..." />` | Legacy file dependency |
