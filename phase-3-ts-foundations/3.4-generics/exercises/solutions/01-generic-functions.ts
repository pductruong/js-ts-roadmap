function identity<T>(value: T): T { return value; }
function first<T>(arr: T[]): T | undefined { return arr[0]; }
function last<T>(arr: T[]): T | undefined { return arr[arr.length - 1]; }
function pair<A, B>(a: A, b: B): [A, B] { return [a, b]; }

function zip<A, B>(arrA: A[], arrB: B[]): [A, B][] {
  const len = Math.min(arrA.length, arrB.length);
  return Array.from({ length: len }, (_, i) => [arrA[i]!, arrB[i]!]);
}

function findById<T extends { id: number }>(items: T[], id: number): T | undefined {
  return items.find(item => item.id === id);
}

console.log(identity("hello"));
console.log(identity(42));
console.log(first([1, 2, 3]));
console.log(first([]));
console.log(last([1, 2, 3]));
console.log(pair("Alice", 30));
console.log(zip([1, 2, 3], ["a", "b", "c"]));
const users = [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }];
console.log(findById(users, 2));
console.log(findById(users, 9));
