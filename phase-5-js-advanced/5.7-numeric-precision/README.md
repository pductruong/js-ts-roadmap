# 5.7 Numeric Precision & IEEE 754

## Why this matters
`0.1 + 0.2 !== 0.3` is not a JavaScript bug — it's a consequence of how all modern CPUs represent floating-point numbers. Knowing this prevents subtle financial, comparison, and accumulation bugs.

## IEEE 754 Double Precision

JavaScript's `number` type is a 64-bit IEEE 754 double-precision float:
- 1 bit: sign
- 11 bits: exponent
- 52 bits: mantissa (significand)

This gives ~15–17 significant decimal digits of precision.

```js
0.1 + 0.2          // 0.30000000000000004
0.1 + 0.2 === 0.3  // false

// Correct comparisons
Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON  // true
```

## Special Values

```js
// Infinity
1 / 0              // Infinity
-1 / 0             // -Infinity
Infinity + 1       // Infinity
isFinite(Infinity) // false
Number.isFinite(Infinity) // false (safer — doesn't coerce)

// NaN — Not a Number
0 / 0              // NaN
Math.sqrt(-1)      // NaN
parseInt("hello")  // NaN

NaN === NaN        // false! NaN is never equal to itself
Number.isNaN(NaN)  // true  (use this, not global isNaN)
isNaN("hello")     // true  (dangerous — coerces first!)
Number.isNaN("hello") // false (correct)

// Negative zero
-0 === 0            // true  (!)
Object.is(-0, 0)    // false (use Object.is for exact comparison)
Object.is(NaN, NaN) // true
```

## Safe Integer Range

```js
Number.MAX_SAFE_INTEGER   // 9007199254740991 (2^53 - 1)
Number.MIN_SAFE_INTEGER   // -9007199254740991

Number.isSafeInteger(Number.MAX_SAFE_INTEGER)     // true
Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1) // false — precision lost!

9007199254740992 === 9007199254740993 // true (!)  — same float representation
```

## BigInt

```js
// Arbitrary precision integers — no floating point issues
const big = 9007199254740993n;  // n suffix
big + 1n                         // 9007199254740994n — correct!

// Cannot mix with number
9n + 1    // TypeError
9n + 1n   // 10n — must use BigInt
Number(9n) // 9 — explicit conversion OK

// No floating point operations
9n / 2n   // 4n — integer division (truncates)
```

## Practical Patterns

```js
// Avoid: floating point accumulation
let total = 0;
[0.1, 0.2, 0.3].forEach(n => total += n);
total === 0.6 // false — 0.6000000000000001

// Better: work in integers (cents)
let cents = 0;
[10, 20, 30].forEach(c => cents += c);
cents / 100 === 0.6 // true

// Rounding correctly
Math.round(1.005 * 100) / 100  // 1 (wrong!)
parseFloat((1.005).toFixed(2)) // 1 (wrong!)
// Use a library like decimal.js for financial work

// Number.EPSILON for comparisons
function nearlyEqual(a, b, epsilon = Number.EPSILON) {
  return Math.abs(a - b) < epsilon * Math.max(Math.abs(a), Math.abs(b));
}
```

## Resources
- [javascript.info: Numbers](https://javascript.info/number)
- [What Every Computer Scientist Should Know About Floating-Point](https://docs.oracle.com/cd/E19957-01/806-3568/ncg_goldberg.html)
- [MDN: BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)
- [IEEE 754 visualizer](https://float.exposed/)

## Exercises
Go to the [exercises](./exercises/) folder.
