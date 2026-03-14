// Exercise 1: Type Predicates
// ----------------------------

// 1a. Write type predicates for primitive types
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isNumber(value: unknown): value is number {
  // YOUR CODE HERE
}

function isNonNullable<T>(value: T): value is NonNullable<T> {
  // YOUR CODE HERE
}

// 1b. Discriminated union predicates
interface Cat { kind: "cat"; name: string; meow(): string; }
interface Dog { kind: "dog"; name: string; bark(): string; }
type Pet = Cat | Dog;

function isCat(pet: Pet): pet is Cat {
  // YOUR CODE HERE
}
function isDog(pet: Pet): pet is Dog {
  // YOUR CODE HERE
}

// 1c. Validate unknown value matches a shape
interface User { kind: "user"; name: string; email: string; }

function isUser(value: unknown): value is User {
  // YOUR CODE HERE: check kind, name, email are correct types
}

// 1d. Generic isArrayOf predicate
function isArrayOf<T>(
  value: unknown,
  predicate: (item: unknown) => item is T
): value is T[] {
  // YOUR CODE HERE
}

// 1e. compact() — filter out null/undefined with proper narrowing
function compact<T>(arr: (T | null | undefined)[]): T[] {
  // YOUR CODE HERE: use a type predicate in filter
}

// Tests
const unknowns: unknown[] = ["hello", 42, null, "world", true];
console.log(unknowns.filter(isString)); // ["hello", "world"]

const pets: Pet[] = [
  { kind: "cat", name: "Whiskers", meow: () => "meow" },
  { kind: "dog", name: "Rex",      bark: () => "woof" },
];
console.log(pets.filter(isCat).map(c => c.meow())); // ["meow"]
console.log(pets.filter(isDog).map(d => d.bark())); // ["woof"]

console.log(isUser({ kind: "user", name: "Alice", email: "a@b.com" })); // true
console.log(isUser({ name: "Alice" }));                                   // false

console.log(isArrayOf(["a", "b"], isString)); // true
console.log(isArrayOf([1, "b"],   isString)); // false

console.log(compact([1, null, 2, undefined, 3])); // [1, 2, 3]
