const people = [
  { name: "Alice", age: 30, city: "Hanoi" },
  { name: "Bob", age: 17, city: "HCMC" },
  { name: "Charlie", age: 25, city: "Hanoi" },
  { name: "Diana", age: 15, city: "Danang" },
];

const adultNames = (people) => people.filter(p => p.age >= 18).map(p => p.name);
const totalAge = (people) => people.reduce((sum, p) => sum + p.age, 0);
const firstFromHanoi = (people) => people.find(p => p.city === "Hanoi");
const allOlderThan10 = (people) => people.every(p => p.age > 10);
const anyMinor = (people) => people.some(p => p.age < 18);
const sortByAge = (people) => [...people].sort((a, b) => a.age - b.age);

const data = [["Hanoi", "HCMC"], ["Danang", "Hanoi"]];
const flatCities = (data) => data.flat();

console.log(adultNames(people));
console.log(totalAge(people));
console.log(firstFromHanoi(people));
console.log(allOlderThan10(people));
console.log(anyMinor(people));
console.log(sortByAge(people).map(p => p.name));
console.log(flatCities(data));
