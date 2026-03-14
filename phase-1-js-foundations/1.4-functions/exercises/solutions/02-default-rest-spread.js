function greet(name = "World") {
  return `Hello, ${name}!`;
}

function sum(...args) {
  return args.reduce((acc, n) => acc + n, 0);
}

function max(...args) {
  return Math.max(...args);
}

function mergeObjects(obj1, obj2) {
  return { ...obj1, ...obj2 };
}

function appendItems(arr, ...items) {
  return [...arr, ...items];
}

console.log(greet());
console.log(greet("Alice"));
console.log(sum(1, 2, 3));
console.log(sum(1, 2, 3, 4, 5));
console.log(max(3, 1, 4, 1, 5, 9));
console.log(mergeObjects({ a: 1 }, { b: 2, a: 99 }));
const arr = [1, 2, 3];
console.log(appendItems(arr, 4, 5));
console.log(arr);
