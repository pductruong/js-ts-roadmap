// ============================================================
// Exercise 01: Declaration Merging
// ============================================================

// Task 1: Interface merging
// TypeScript merges interfaces with the same name in the same scope.
// These three declarations combine into one effective Config type:
interface Config {
  host: string;
  port: number;
}
interface Config {
  timeout: number;
  retries: number;
}
interface Config {
  ssl: boolean;
}

// Write a function createConfig that returns a fully-typed Config object:
function createConfig(): Config {
  // TODO: return object satisfying the merged Config interface
}

// Task 2: Function + namespace merging
// A function and a namespace with the same name merge: the namespace adds
// properties/methods to the function object.

function validate(value: unknown): boolean {
  // TODO: return true if value is not null/undefined
  return true;
}

namespace validate {
  export function string(value: unknown): value is string {
    // TODO: return true if typeof value === 'string'
  }
  export function number(value: unknown): value is number {
    // TODO: return true if typeof value === 'number'
  }
  export function email(value: string): boolean {
    // TODO: return true if value matches a basic email pattern (contains @ and .)
  }
}

// Task 3: Mapped type modifiers
// Implement these utility types from scratch (do NOT use built-in TypeScript utility types):
type MyRequired<T> = {
  // TODO: make all properties required (remove the ? optional modifier)
};

type MyReadonly<T> = {
  // TODO: make all properties readonly
};

type Mutable<T> = {
  // TODO: remove readonly from all properties
};

type MyPartial<T> = {
  // TODO: make all properties optional
};

// Task 4: Augmenting built-in types
// Add a typed declaration for a `last` accessor on Array:
declare global {
  interface Array<T> {
    // TODO: declare `last` as a property that returns T | undefined
    last: T | undefined;
  }
}

// Implement the runtime version (uncomment and complete):
// Object.defineProperty(Array.prototype, 'last', {
//   get() { return this[this.length - 1]; },
//   configurable: true,
// });

function testArrayLast(): void {
  const arr = [1, 2, 3];
  const empty: number[] = [];
  // TODO: log arr.last (should be 3) and empty.last (should be undefined)
}
