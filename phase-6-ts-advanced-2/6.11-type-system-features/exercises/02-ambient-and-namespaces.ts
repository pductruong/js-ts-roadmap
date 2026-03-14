// ============================================================
// Exercise 02: Ambient Modules & Namespaces
// ============================================================

// Task 1: Ambient module declaration
// When a third-party package has no type definitions, you write ambient declarations.
// Write ambient declarations for a hypothetical 'fast-math' package:
declare module 'fast-math' {
  // TODO: declare:
  // - function add(a: number, b: number): number
  // - function multiply(a: number, b: number): number
  // - const PI: number
  // - class Vector2D with properties x: number, y: number
  //   and method add(other: Vector2D): Vector2D
}

// Task 2: Namespace for grouping utilities
// Namespaces group related declarations. Create a Utils namespace:
namespace Utils {
  export namespace Str {
    // TODO: implement capitalize(s: string): string
    //   Returns the string with the first letter uppercased
    export function capitalize(s: string): string {
      // TODO
      return s;
    }

    // TODO: implement truncate(s: string, maxLen: number): string
    //   Returns s if length <= maxLen, otherwise s.slice(0, maxLen) + '...'
    export function truncate(s: string, maxLen: number): string {
      // TODO
      return s;
    }
  }

  export namespace Arr {
    // TODO: implement chunk<T>(arr: T[], size: number): T[][]
    //   Splits array into chunks of given size
    export function chunk<T>(arr: T[], size: number): T[][] {
      // TODO
      return [];
    }

    // TODO: implement unique<T>(arr: T[]): T[]
    //   Returns array with duplicates removed (preserving order)
    export function unique<T>(arr: T[]): T[] {
      // TODO
      return arr;
    }
  }

  export namespace Obj {
    // TODO: implement omit<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K>
    //   Returns a new object without the specified keys
    export function omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
      // TODO
      return {} as Omit<T, K>;
    }

    // TODO: implement pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K>
    //   Returns a new object with only the specified keys
    export function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
      // TODO
      return {} as Pick<T, K>;
    }
  }
}

// Task 3: Global augmentation pattern
// Extend the global Window interface (for browser environments) and add a global function:
declare global {
  interface Window {
    // TODO: add __APP_VERSION__: string
    // TODO: add __BUILD_DATE__: string
  }

  // TODO: declare a global function trackEvent(event: string, data?: Record<string, unknown>): void
}

// Task 4: Type-safe module re-export
// Write a typed helper that creates a "barrel" object wrapping module exports:
function createBarrel<T extends Record<string, unknown>>(exports: T): T {
  // TODO: return a Proxy around exports that logs which keys are accessed
  return exports;
}

// Example usage (types should work):
const mathBarrel = createBarrel({ add: (a: number, b: number) => a + b, PI: 3.14159 });
