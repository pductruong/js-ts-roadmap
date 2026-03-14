function isString(v: unknown): v is string { return typeof v === "string"; }
function isNumber(v: unknown): v is number { return typeof v === "number"; }
function isNonNullable<T>(v: T): v is NonNullable<T> { return v != null; }

interface Cat { kind: "cat"; name: string; meow(): string; }
interface Dog { kind: "dog"; name: string; bark(): string; }
type Pet = Cat | Dog;

function isCat(pet: Pet): pet is Cat { return pet.kind === "cat"; }
function isDog(pet: Pet): pet is Dog { return pet.kind === "dog"; }

interface User { kind: "user"; name: string; email: string; }
function isUser(v: unknown): v is User {
  return typeof v === "object" && v !== null
    && (v as any).kind === "user"
    && typeof (v as any).name === "string"
    && typeof (v as any).email === "string";
}

function isArrayOf<T>(v: unknown, p: (x: unknown) => x is T): v is T[] {
  return Array.isArray(v) && v.every(p);
}

function compact<T>(arr: (T | null | undefined)[]): T[] {
  return arr.filter((x): x is T => x != null);
}

const unknowns: unknown[] = ["hello", 42, null, "world", true];
console.log(unknowns.filter(isString));
const pets: Pet[] = [
  { kind: "cat", name: "Whiskers", meow: () => "meow" },
  { kind: "dog", name: "Rex",      bark: () => "woof" },
];
console.log(pets.filter(isCat).map(c => c.meow()));
console.log(pets.filter(isDog).map(d => d.bark()));
console.log(isUser({ kind: "user", name: "Alice", email: "a@b.com" }));
console.log(isUser({ name: "Alice" }));
console.log(isArrayOf(["a", "b"], isString));
console.log(isArrayOf([1, "b"],   isString));
console.log(compact([1, null, 2, undefined, 3]));
