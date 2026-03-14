function sumPositive(numbers) {
  let sum = 0;
  for (const n of numbers) {
    if (n > 0) sum += n;
  }
  return sum;
}

function firstDivisibleBy(numbers, n) {
  for (const num of numbers) {
    if (num % n === 0) return num;
  }
  return -1;
}

function objectEntries(obj) {
  const result = [];
  for (const key in obj) {
    result.push(`${key}: ${obj[key]}`);
  }
  return result;
}

function skipMultiplesOfThree(numbers) {
  const result = [];
  for (const n of numbers) {
    if (n % 3 === 0) continue;
    result.push(n);
  }
  return result;
}

console.log(sumPositive([1, -2, 3, -4, 5]));
console.log(firstDivisibleBy([3, 7, 11, 14], 7));
console.log(firstDivisibleBy([3, 7, 11], 5));
console.log(objectEntries({ name: "Alice", age: 30 }));
console.log(skipMultiplesOfThree([1, 2, 3, 4, 5, 6, 7]));
