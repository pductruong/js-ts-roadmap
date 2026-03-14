function* range(start, end) {
  for (let i = start; i <= end; i++) yield i;
}

function* fibonacci() {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

function* doubled(iterable) {
  for (const item of iterable) yield item * 2;
}

function take(n, iterable) {
  const result = [];
  for (const val of iterable) {
    result.push(val);
    if (result.length === n) break;
  }
  return result;
}

console.log([...range(1, 5)]);
console.log([...range(3, 3)]);
console.log(take(8, fibonacci()));
console.log([...doubled([1, 2, 3])]);
console.log(take(3, doubled(range(1, 10))));
