function factorial(n) {
  if (n <= 1n) return 1n;
  return n * factorial(n - 1n);
}

function fibonacci(n) {
  let [a, b] = [0n, 1n];
  for (let i = 0n; i < n; i++) [a, b] = [b, a + b];
  return a;
}

function formatBigInt(n) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function safeAdd(a, b) {
  if (!Number.isSafeInteger(a) || !Number.isSafeInteger(b)) {
    throw new RangeError(`Unsafe integer operation: ${a} + ${b}`);
  }
  return a + b;
}

console.log(factorial(20n));
console.log(factorial(100n));
console.log(fibonacci(50n));
console.log(fibonacci(100n));
console.log(formatBigInt(1234567890n));
console.log(formatBigInt(factorial(20n)));
console.log(safeAdd(100, 200));
try { safeAdd(Number.MAX_SAFE_INTEGER, 1); } catch (e) { console.log(e.message); }

// Edge cases
console.log("\n--- BigInt edge cases ---");
console.log(typeof 42n);
console.log(10n / 3n);
console.log(10n % 3n);
console.log(2n ** 64n);
console.log(BigInt(Number.MAX_SAFE_INTEGER) + 1n);
console.log(9n > 5);
try { console.log(9n + 5); } catch(e) { console.log(e.message); }
