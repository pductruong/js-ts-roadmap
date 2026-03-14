// ============================================================
// Solutions 02: Ambient Modules & Namespaces
// ============================================================

// Task 1: Ambient module declaration
declare module 'fast-math' {
  export function add(a: number, b: number): number;
  export function multiply(a: number, b: number): number;
  export const PI: number;
  export class Vector2D {
    x: number;
    y: number;
    constructor(x: number, y: number);
    add(other: Vector2D): Vector2D;
  }
}

// Task 2: Namespace utilities
namespace Utils {
  export namespace Str {
    export function capitalize(s: string): string {
      if (!s) return s;
      return s.charAt(0).toUpperCase() + s.slice(1);
    }
    export function truncate(s: string, maxLen: number): string {
      return s.length <= maxLen ? s : s.slice(0, maxLen) + '...';
    }
  }

  export namespace Arr {
    export function chunk<T>(arr: T[], size: number): T[][] {
      const result: T[][] = [];
      for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size));
      }
      return result;
    }
    export function unique<T>(arr: T[]): T[] {
      return [...new Set(arr)];
    }
  }

  export namespace Obj {
    export function omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
      const result = { ...obj };
      for (const key of keys) {
        delete result[key];
      }
      return result as Omit<T, K>;
    }
    export function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
      const result = {} as Pick<T, K>;
      for (const key of keys) {
        result[key] = obj[key];
      }
      return result;
    }
  }
}

// Task 3: Global augmentation
declare global {
  interface Window {
    __APP_VERSION__: string;
    __BUILD_DATE__: string;
  }
  function trackEvent(event: string, data?: Record<string, unknown>): void;
}

// Task 4: Type-safe barrel
function createBarrel<T extends Record<string, unknown>>(exports: T): T {
  return new Proxy(exports, {
    get(target, key: string | symbol) {
      if (typeof key === 'string') {
        console.log(`[Barrel] Accessing: ${key}`);
      }
      return Reflect.get(target, key);
    }
  });
}

// Demo
console.log('=== Namespace Utils ===');
console.log(Utils.Str.capitalize('hello'));          // Hello
console.log(Utils.Str.truncate('Hello World', 7));  // Hello W...
console.log(Utils.Arr.chunk([1,2,3,4,5], 2));       // [[1,2],[3,4],[5]]
console.log(Utils.Arr.unique([1,2,2,3,3,3]));       // [1,2,3]

const person = { id: 1, name: 'Alice', age: 30, email: 'alice@example.com' };
console.log(Utils.Obj.pick(person, ['id', 'name']));         // { id: 1, name: 'Alice' }
console.log(Utils.Obj.omit(person, ['age', 'email']));       // { id: 1, name: 'Alice' }

console.log('\n=== Barrel Proxy ===');
const mathBarrel = createBarrel({ add: (a: number, b: number) => a + b, PI: 3.14159 });
console.log(mathBarrel.add(2, 3)); // [Barrel] Accessing: add → 5
console.log(mathBarrel.PI);        // [Barrel] Accessing: PI → 3.14159
