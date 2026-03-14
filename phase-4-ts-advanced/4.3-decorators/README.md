# 4.3 Decorators

> **Note:** Decorators require `"experimentalDecorators": true` in tsconfig.json.
> This repo uses the newer Stage 3 decorators (no flag needed in TS 5+).
> The examples below use the Stage 3 syntax.

## Concepts

Decorators are functions that wrap classes, methods, or properties to add behavior.

### Class Decorator
```ts
function sealed(target: new (...args: any[]) => any) {
  Object.seal(target);
  Object.seal(target.prototype);
}

@sealed
class BankAccount { /* ... */ }
```

### Method Decorator
```ts
function log(target: any, context: ClassMethodDecoratorContext) {
  return function(this: any, ...args: any[]) {
    console.log(`Calling ${String(context.name)} with`, args);
    return target.call(this, ...args);
  };
}

class Calculator {
  @log
  add(a: number, b: number) { return a + b; }
}
```

### Common Patterns
- `@log` — log method calls
- `@memoize` — cache method results
- `@validate` — validate parameters
- `@deprecated` — warn when method is used

## Resources
- [TypeScript Handbook: Decorators](https://www.typescriptlang.org/docs/handbook/decorators.html)
- [TC39 Decorators Proposal](https://github.com/tc39/proposal-decorators)

## Exercises
Go to the [exercises](./exercises/) folder.
