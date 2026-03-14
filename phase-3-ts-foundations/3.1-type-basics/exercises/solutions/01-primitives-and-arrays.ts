let username = "Alice";
let score = 100;
let isLoggedIn = false;

let greeting: string = "Hello";
let count: number = 0;
let enabled: boolean = true;

let fruits: string[] = ["apple", "banana", "cherry"];
let scores: number[] = [95, 87, 72];

function double(n: number): number {
  return n * 2;
}

let userRecord: [string, number, boolean] = ["Alice", 30, true];
const [name, age, active] = userRecord;

function minMax(nums: number[]): [number, number] {
  const sorted = [...nums].sort((a, b) => a - b);
  return [sorted[0]!, sorted[sorted.length - 1]!];
}

const [min, max] = minMax([3, 1, 4, 1, 5, 9]);
console.log(min, max);
