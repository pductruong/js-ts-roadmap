// Exercise 3: Map & Set
// ----------------------

// 3a. Count word frequency using a Map
// "hello world hello" => Map { "hello" => 2, "world" => 1 }
function wordFrequency(sentence) {
  // YOUR CODE HERE
}

// 3b. Remove duplicates from an array using Set
function unique(arr) {
  // YOUR CODE HERE
}

// 3c. Find the intersection of two arrays (values in both)
function intersection(arr1, arr2) {
  // Hint: use Set for O(1) lookup
  // YOUR CODE HERE
}

// 3d. Find the union of two arrays (all unique values from both)
function union(arr1, arr2) {
  // YOUR CODE HERE
}

// 3e. Group an array of objects by a key using Map
// groupBy([{name:"Alice",dept:"Eng"},{name:"Bob",dept:"HR"},{name:"Carol",dept:"Eng"}], "dept")
// => Map { "Eng" => [{...Alice}, {...Carol}], "HR" => [{...Bob}] }
function groupBy(items, key) {
  // YOUR CODE HERE
}

// Tests
console.log(wordFrequency("hello world hello")); // Map { hello => 2, world => 1 }
console.log(unique([1, 2, 2, 3, 3, 4]));         // [1, 2, 3, 4]
console.log(intersection([1, 2, 3], [2, 3, 4])); // [2, 3]
console.log(union([1, 2, 3], [2, 3, 4]));         // [1, 2, 3, 4]
const people = [
  { name: "Alice", dept: "Eng" },
  { name: "Bob", dept: "HR" },
  { name: "Carol", dept: "Eng" },
];
const grouped = groupBy(people, "dept");
console.log(grouped.get("Eng").map(p => p.name)); // ["Alice", "Carol"]
console.log(grouped.get("HR").map(p => p.name));  // ["Bob"]
