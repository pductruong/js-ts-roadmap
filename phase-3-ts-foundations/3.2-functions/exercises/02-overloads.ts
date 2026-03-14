// Exercise 2: Function Overloads
// --------------------------------

// 2a. Overload: reverse() works on both string and array
// reverse("hello") => "olleh"
// reverse([1,2,3]) => [3,2,1]
function reverse(value: string): string;
function reverse<T>(value: T[]): T[];
function reverse(value: string | any[]): string | any[] {
  // YOUR CODE HERE
}

// 2b. Overload: get() returns different types based on key type
// get(object, "name") => string
// get(object, 0) => first value
interface DataStore {
  [key: string]: unknown;
}
function get(store: DataStore, key: string): unknown;
function get<T>(store: T[], index: number): T;
function get(store: any, key: any): any {
  // YOUR CODE HERE
}

// 2c. Overload: stringify() behaves differently per type
// stringify(42) => "42"
// stringify(true) => "true"
// stringify({a:1}) => JSON string
function stringify(value: number): string;
function stringify(value: boolean): string;
function stringify(value: object): string;
function stringify(value: number | boolean | object): string {
  // YOUR CODE HERE
}

// Tests
console.log(reverse("hello"));    // "olleh"
console.log(reverse([1, 2, 3]));  // [3, 2, 1]

const store: DataStore = { name: "Alice", age: 30 };
console.log(get(store, "name"));       // "Alice"
console.log(get([10, 20, 30], 1));     // 20

console.log(stringify(42));             // "42"
console.log(stringify(true));           // "true"
console.log(stringify({ a: 1 }));       // '{"a":1}'
