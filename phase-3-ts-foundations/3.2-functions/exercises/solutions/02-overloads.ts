function reverse(value: string): string;
function reverse<T>(value: T[]): T[];
function reverse(value: string | any[]): string | any[] {
  if (typeof value === "string") return value.split("").reverse().join("");
  return [...value].reverse();
}

interface DataStore { [key: string]: unknown; }
function get(store: DataStore, key: string): unknown;
function get<T>(store: T[], index: number): T;
function get(store: any, key: any): any {
  return store[key];
}

function stringify(value: number): string;
function stringify(value: boolean): string;
function stringify(value: object): string;
function stringify(value: number | boolean | object): string {
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

console.log(reverse("hello"));
console.log(reverse([1, 2, 3]));
const store: DataStore = { name: "Alice", age: 30 };
console.log(get(store, "name"));
console.log(get([10, 20, 30], 1));
console.log(stringify(42));
console.log(stringify(true));
console.log(stringify({ a: 1 }));
