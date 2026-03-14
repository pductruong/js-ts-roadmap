function add(a: number, b: number): number {
  return a + b;
}

function greet(name: string, greeting: string = "Hello"): string {
  return `${greeting}, ${name}!`;
}

function log(message: string, level?: string): void {
  console.log(`[${level ?? "info"}] ${message}`);
}

type NumberPredicate = (n: number) => boolean;

function filter<T>(arr: T[], predicate: (item: T) => boolean): T[] {
  return arr.filter(predicate);
}

type Mapper<T, U> = (item: T) => U;
function map<T, U>(arr: T[], mapper: Mapper<T, U>): U[] {
  return arr.map(mapper);
}

console.log(add(2, 3));
console.log(greet("Alice"));
console.log(greet("Bob", "Hi"));
log("Server started", "info");
log("File not found", "warn");

const isEven: NumberPredicate = n => n % 2 === 0;
console.log(filter([1, 2, 3, 4, 5], isEven));
const toStr: Mapper<number, string> = n => String(n);
console.log(map([1, 2, 3], toStr));
