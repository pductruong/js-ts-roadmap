// Exercise 1: Generic Functions
// ------------------------------

// 1a. Generic identity function
function identity<T>(value: T): T {
  return value;
}

// 1b. Generic first() — returns first element or undefined
function first<T>(arr: T[]): T | undefined {
  // YOUR CODE HERE
}

// 1c. Generic last() — returns last element or undefined
function last<T>(arr: T[]): T | undefined {
  // YOUR CODE HERE
}

// 1d. Generic pair() — takes two values, returns them as a tuple [A, B]
function pair<A, B>(a: A, b: B): [A, B] {
  // YOUR CODE HERE
}

// 1e. Generic zip() — zips two arrays into array of pairs
// zip([1,2,3], ["a","b","c"]) => [[1,"a"], [2,"b"], [3,"c"]]
function zip<A, B>(arrA: A[], arrB: B[]): [A, B][] {
  // YOUR CODE HERE
}

// 1f. Constrained generic — only works on objects with an `id` field
function findById<T extends { id: number }>(items: T[], id: number): T | undefined {
  // YOUR CODE HERE
}

// Tests
console.log(identity("hello"));     // "hello"
console.log(identity(42));          // 42
console.log(first([1, 2, 3]));      // 1
console.log(first([]));             // undefined
console.log(last([1, 2, 3]));       // 3
console.log(pair("Alice", 30));     // ["Alice", 30]
console.log(zip([1, 2, 3], ["a", "b", "c"])); // [[1,"a"],[2,"b"],[3,"c"]]

const users = [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }];
console.log(findById(users, 2)); // { id: 2, name: "Bob" }
console.log(findById(users, 9)); // undefined
