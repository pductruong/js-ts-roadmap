function grade(score) {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}

function fizzBuzz(n) {
  if (n % 15 === 0) return "FizzBuzz";
  if (n % 3 === 0) return "Fizz";
  if (n % 5 === 0) return "Buzz";
  return String(n);
}

function maxOfThree(a, b, c) {
  if (a >= b && a >= c) return a;
  if (b >= c) return b;
  return c;
  // Alternatively: return Math.max(a, b, c);
}

console.log(grade(95));
console.log(grade(83));
console.log(grade(55));
console.log(fizzBuzz(15));
console.log(fizzBuzz(9));
console.log(fizzBuzz(10));
console.log(fizzBuzz(7));
console.log(maxOfThree(3, 7, 5));
