// ============================================================
// Solutions 01: Declaration Merging
// ============================================================

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

function createConfig(): Config {
  return {
    host: 'localhost',
    port: 8080,
    timeout: 5000,
    retries: 3,
    ssl: false,
  };
}

function validate(value: unknown): boolean {
  return value !== null && value !== undefined;
}

namespace validate {
  export function string(value: unknown): value is string {
    return typeof value === 'string';
  }
  export function number(value: unknown): value is number {
    return typeof value === 'number' && !isNaN(value);
  }
  export function email(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }
}

type MyRequired<T> = {
  [K in keyof T]-?: T[K];
};

type MyReadonly<T> = {
  readonly [K in keyof T]: T[K];
};

type Mutable<T> = {
  -readonly [K in keyof T]: T[K];
};

type MyPartial<T> = {
  [K in keyof T]?: T[K];
};

declare global {
  interface Array<T> {
    last: T | undefined;
  }
}

Object.defineProperty(Array.prototype, 'last', {
  get() { return this[this.length - 1]; },
  configurable: true,
});

function testArrayLast(): void {
  const arr = [1, 2, 3];
  const empty: number[] = [];
  console.log('arr.last:', arr.last);     // 3
  console.log('empty.last:', empty.last); // undefined
}

// Demo
console.log('=== Declaration Merging ===');
const config = createConfig();
console.log('Config:', config);

console.log('\n=== Function + Namespace Merging ===');
console.log('validate(42):', validate(42));
console.log('validate.string("hi"):', validate.string('hi'));
console.log('validate.number(3.14):', validate.number(3.14));
console.log('validate.email("user@example.com"):', validate.email('user@example.com'));
console.log('validate.email("not-email"):', validate.email('not-email'));

console.log('\n=== Mapped Type Modifiers ===');
type Person = { name: string; age?: number; readonly id: number };
// Type-level only - just show the types exist by using them in variables:
const required: MyRequired<{ a?: string; b?: number }> = { a: 'hello', b: 42 };
const mutable: Mutable<{ readonly x: number }> = { x: 1 };
mutable.x = 2;
console.log('Mutable x:', mutable.x);

console.log('\n=== Array Last Augmentation ===');
testArrayLast();
