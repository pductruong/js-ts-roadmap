function sumTo(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) sum += i;
  return sum;
}

function evensUpTo(n) {
  const result = [];
  for (let i = 2; i <= n; i += 2) result.push(i);
  return result;
}

function factorial(n) {
  let result = 1;
  while (n > 1) { result *= n; n--; }
  return result;
}

function countDown(n) {
  const result = [];
  for (let i = n; i >= 1; i--) result.push(i);
  return result;
}

function multiplicationTable(n) {
  for (let i = 1; i <= 10; i++) {
    console.log(`${n} x ${i} = ${n * i}`);
  }
}

console.log(sumTo(5));
console.log(sumTo(10));
console.log(evensUpTo(10));
console.log(factorial(5));
console.log(factorial(0));
console.log(countDown(5));
multiplicationTable(3);
