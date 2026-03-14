// 5.11 Solutions — Abstract Equality & Abstract Operations
// =========================================================
// Reference: ECMA-262 §7.2.15, §7.1.3, §7.1.17, §7.1.1

'use strict';

// ---------------------------------------------------------------------------
// Helper: typeof that matches spec Type() names
// ---------------------------------------------------------------------------
function specType(value) {
  if (value === null) return 'null';
  return typeof value; // 'undefined', 'boolean', 'number', 'string', 'symbol', 'bigint', 'object', 'function'
}

// ---------------------------------------------------------------------------
// Task 2 (defined first because abstractEqual depends on it)
// ToPrimitive — ECMA-262 §7.1.1
// ---------------------------------------------------------------------------
function toPrimitive(value, hint = 'default') {
  // Step 1: if input is already a primitive, return it unchanged
  if (value === null || typeof value !== 'object' && typeof value !== 'function') {
    return value;
  }

  // Step 2-3: check for Symbol.toPrimitive
  const exoticToPrim = value[Symbol.toPrimitive];
  if (typeof exoticToPrim === 'function') {
    const result = exoticToPrim.call(value, hint);
    if (result === null || typeof result !== 'object' && typeof result !== 'function') {
      return result;
    }
    throw new TypeError('Symbol.toPrimitive must return a primitive');
  }

  // Step 4: default hint falls back to "number" for ordinary objects
  const effectiveHint = hint === 'default' ? 'number' : hint;

  // Step 5: OrdinaryToPrimitive
  return ordinaryToPrimitive(value, effectiveHint);
}

function ordinaryToPrimitive(obj, hint) {
  // Method order depends on hint
  const methodNames = hint === 'string'
    ? ['toString', 'valueOf']
    : ['valueOf', 'toString'];

  for (const name of methodNames) {
    const method = obj[name];
    if (typeof method === 'function') {
      const result = method.call(obj);
      // Only use the result if it is a primitive
      if (result === null || typeof result !== 'object' && typeof result !== 'function') {
        return result;
      }
    }
  }

  throw new TypeError(`Cannot convert object to primitive (hint: ${hint})`);
}

// ---------------------------------------------------------------------------
// Task 3: ToNumber — ECMA-262 §7.1.4
// ---------------------------------------------------------------------------
function toNumber(value) {
  const t = specType(value);

  if (t === 'undefined') return NaN;
  if (t === 'null')      return +0;
  if (t === 'boolean')   return value ? 1 : +0;
  if (t === 'number')    return value;
  if (t === 'symbol')    throw new TypeError('Cannot convert Symbol to number');
  if (t === 'bigint')    throw new TypeError('Cannot convert BigInt to number');

  if (t === 'string') {
    const trimmed = value.trim();
    if (trimmed === '') return +0;
    // Handle hex
    if (/^0[xX][0-9a-fA-F]+$/.test(trimmed)) return parseInt(trimmed, 16);
    // Handle octal (0o)
    if (/^0[oO][0-7]+$/.test(trimmed))        return parseInt(trimmed.slice(2), 8);
    // Handle binary (0b)
    if (/^0[bB][01]+$/.test(trimmed))          return parseInt(trimmed.slice(2), 2);
    const n = Number(trimmed);
    return n; // Number() returns NaN for invalid strings
  }

  // object / function: delegate through ToPrimitive with hint "number"
  const prim = toPrimitive(value, 'number');
  return toNumber(prim);
}

// ---------------------------------------------------------------------------
// Task 1: abstractEqual — ECMA-262 §7.2.15
// ---------------------------------------------------------------------------
function abstractEqual(a, b) {
  const typeA = specType(a);
  const typeB = specType(b);

  // Step 1: same type → strict comparison
  // (function is object-ish but we treat it like object for equality)
  if (typeA === typeB) {
    // Strict equality handles NaN !== NaN, -0 === +0, object identity, etc.
    return a === b;
  }

  // Steps 2-3: null == undefined (and vice versa)
  if ((a === null || a === undefined) && (b === null || b === undefined)) {
    return true;
  }

  // Steps 4-5: if one side is null/undefined and the other is not, false
  if (a === null || a === undefined) return false;
  if (b === null || b === undefined) return false;

  // Step 6: Number == String → Number == ToNumber(String)
  if ((typeA === 'number' || typeA === 'bigint') && typeB === 'string') {
    return abstractEqual(a, toNumber(b));
  }

  // Step 7: String == Number → ToNumber(String) == Number
  if (typeA === 'string' && (typeB === 'number' || typeB === 'bigint')) {
    return abstractEqual(toNumber(a), b);
  }

  // Step 8: Boolean on the left → convert it to number first
  if (typeA === 'boolean') {
    return abstractEqual(toNumber(a), b);
  }

  // Step 9: Boolean on the right → convert it to number first
  if (typeB === 'boolean') {
    return abstractEqual(a, toNumber(b));
  }

  // Step 10: primitive == object → compare primitive to ToPrimitive(object)
  const primitiveTypes = new Set(['string', 'number', 'bigint', 'symbol']);
  if (primitiveTypes.has(typeA) && (typeB === 'object' || typeB === 'function')) {
    return abstractEqual(a, toPrimitive(b, 'default'));
  }

  // Step 11: object == primitive → compare ToPrimitive(object) to primitive
  if ((typeA === 'object' || typeA === 'function') && primitiveTypes.has(typeB)) {
    return abstractEqual(toPrimitive(a, 'default'), b);
  }

  // Step 12: everything else → false
  return false;
}

// ---------------------------------------------------------------------------
// Task 4: Money class with Symbol.toPrimitive
// ---------------------------------------------------------------------------
class Money {
  constructor(amount, currency = 'USD') {
    this.amount = amount;
    this.currency = currency;
  }

  [Symbol.toPrimitive](hint) {
    if (hint === 'string') {
      // Format as "$10.00"
      return `${this.currency === 'USD' ? '$' : this.currency}${this.amount.toFixed(2)}`;
    }
    // hint === 'number' or hint === 'default'
    return this.amount;
  }
}

// ---------------------------------------------------------------------------
// Demonstrations
// ---------------------------------------------------------------------------

console.log('=== Task 1: Predict abstract equality results ===');

const pairs = [
  [null, undefined],
  [null, 0],
  [0, "0"],
  [0, false],
  ["", false],
  [[], false],
  [[], ""],
  [null, false],
];

const explanations = [
  'Steps 2/3: null == undefined is always true',
  'Step 4/5: null only == null/undefined, not 0 → false',
  'Step 6: 0 == ToNumber("0") = 0 == 0 → true',
  'Step 8: ToNumber(false)=0, then 0 == 0 → true',
  'Step 9: ToNumber(false)=0 → "" == 0; Step 7: ToNumber("")=0 → 0==0 → true',
  'Step 9: ToNumber(false)=0 → [] == 0; Step 11: ToPrimitive([])="" → "" == 0; Step 7: ToNumber("")=0 → true',
  'Step 11: ToPrimitive([])="" → "" == "" → true',
  'Step 4/5: null is not == to false → false',
];

pairs.forEach(([a, b], i) => {
  const result = abstractEqual(a, b);
  const native = a == b;
  const matches = result === native ? 'PASS' : 'FAIL';
  console.log(`  ${JSON.stringify(a)} == ${JSON.stringify(b)}`);
  console.log(`    Our impl : ${result}`);
  console.log(`    Native== : ${native}  [${matches}]`);
  console.log(`    Why      : ${explanations[i]}`);
  console.log();
});

// ---------------------------------------------------------------------------

console.log('=== Task 2: ToPrimitive ===');

const obj1 = { valueOf() { return 42; }, toString() { return 'forty-two'; } };
console.log('  hint "number" on {valueOf:42, toString:"forty-two"}:',
  toPrimitive(obj1, 'number'));   // 42 (valueOf first)
console.log('  hint "string" on same object:',
  toPrimitive(obj1, 'string'));   // "forty-two" (toString first)

const obj2 = { valueOf() { return {}; }, toString() { return 'fallback'; } };
console.log('  hint "number" when valueOf() returns object (falls through to toString):',
  toPrimitive(obj2, 'number'));   // "fallback"

const obj3 = {
  [Symbol.toPrimitive](hint) { return `hint=${hint}`; }
};
console.log('  object with Symbol.toPrimitive, hint "string":',
  toPrimitive(obj3, 'string'));   // "hint=string"
console.log('  object with Symbol.toPrimitive, hint "number":',
  toPrimitive(obj3, 'number'));   // "hint=number"

console.log('  array ToPrimitive (default):',  toPrimitive([]));        // ""
console.log('  array ToPrimitive (number):',   toPrimitive([], 'number')); // 0? No: "" from toString
console.log('  plain {} ToPrimitive:',         toPrimitive({}));         // "[object Object]"
console.log();

// ---------------------------------------------------------------------------

console.log('=== Task 3: ToNumber ===');

const toNumberCases = [
  [undefined,  NaN],
  [null,       0],
  [true,       1],
  [false,      0],
  ['',         0],
  ['  42  ',   42],
  ['0x1F',     31],
  ['0b1010',   10],
  ['0o17',     15],
  ['abc',      NaN],
  [[],         0],
  [[3],        3],
  [{},         NaN],
];

toNumberCases.forEach(([input, expected]) => {
  let result;
  try { result = toNumber(input); } catch (e) { result = `throws: ${e.message}`; }
  const ok = (Number.isNaN(result) && Number.isNaN(expected)) || result === expected;
  console.log(`  toNumber(${JSON.stringify(input)}) → ${result}  expected: ${expected}  [${ok ? 'PASS' : 'FAIL'}]`);
});

try {
  toNumber(Symbol('s'));
} catch (e) {
  console.log(`  toNumber(Symbol) → throws TypeError: ${e.message}  [PASS]`);
}
console.log();

// ---------------------------------------------------------------------------

console.log('=== Task 4: Money with Symbol.toPrimitive ===');

const price = new Money(10.5);
const rent  = new Money(1200, 'GBP');

// Template literal → string hint
console.log(`  Template literal: \`Price is \${price}\` → "Price is ${price}"`);
console.log(`  Template literal: \`Rent is \${rent}\`   → "Rent is ${rent}"`);

// Unary + → number hint
console.log(`  Unary +price → ${+price}   (number hint)`);
console.log(`  Unary +rent  → ${+rent}  (number hint)`);

// Arithmetic → default hint (falls to number)
console.log(`  price + 0   → ${price + 0}   (default hint → numeric amount)`);
console.log(`  price + 1   → ${price + 1} (default hint → numeric amount + 1)`);

// Comparison → number hint
console.log(`  price > 10  → ${price > 10}  (number hint)`);
console.log(`  price == 10.5 → ${price == 10.5} (default hint, then number comparison)`);

// String concatenation with explicit string
console.log(`  "Total: " + price → "${"Total: " + price}" (default hint on the object side)`);
// Note: "Total: " + price triggers default hint on price, which returns the number,
// and then JS converts that number to string for concatenation.
// If you want the formatted version, use template literals or String(price).
console.log(`  String(price) → "${String(price)}" (string hint)`);
