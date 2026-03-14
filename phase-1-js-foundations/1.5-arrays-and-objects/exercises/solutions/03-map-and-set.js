function wordFrequency(sentence) {
  const map = new Map();
  for (const word of sentence.split(" ")) {
    map.set(word, (map.get(word) ?? 0) + 1);
  }
  return map;
}

function unique(arr) {
  return [...new Set(arr)];
}

function intersection(arr1, arr2) {
  const set = new Set(arr2);
  return arr1.filter(x => set.has(x));
}

function union(arr1, arr2) {
  return [...new Set([...arr1, ...arr2])];
}

function groupBy(items, key) {
  const map = new Map();
  for (const item of items) {
    const k = item[key];
    if (!map.has(k)) map.set(k, []);
    map.get(k).push(item);
  }
  return map;
}

console.log(wordFrequency("hello world hello"));
console.log(unique([1, 2, 2, 3, 3, 4]));
console.log(intersection([1, 2, 3], [2, 3, 4]));
console.log(union([1, 2, 3], [2, 3, 4]));
const people = [
  { name: "Alice", dept: "Eng" },
  { name: "Bob", dept: "HR" },
  { name: "Carol", dept: "Eng" },
];
const grouped = groupBy(people, "dept");
console.log(grouped.get("Eng").map(p => p.name));
console.log(grouped.get("HR").map(p => p.name));
