function firstAndSecond([first, second]) {
  return { first, second };
}

function getPersonInfo({ name, age = 0 }) {
  return `${name} (${age})`;
}

function swap(a, b) {
  [a, b] = [b, a];
  return [a, b];
}

function merge(obj1, obj2) {
  return { ...obj1, ...obj2 };
}

function addProperty(obj, key, value) {
  return { ...obj, [key]: value };
}

console.log(firstAndSecond([10, 20, 30]));
console.log(getPersonInfo({ name: "Alice", age: 30 }));
console.log(getPersonInfo({ name: "Bob" }));
console.log(swap(1, 2));
console.log(merge({ a: 1, b: 2 }, { b: 99, c: 3 }));
const obj = { x: 1 };
console.log(addProperty(obj, "y", 2));
console.log(obj);
