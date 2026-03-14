// 5.11 Exercises — Abstract Equality & Abstract Operations
// =========================================================
// Reference: ECMA-262 §7.2.15 (Abstract Equality Comparison)
//            §7.1 (Type Conversion abstract operations)

'use strict';

// ---------------------------------------------------------------------------
// Task 1: Predict abstract equality results
// ---------------------------------------------------------------------------
// Without running them, predict what each returns and WHY (cite the spec step).
// Add your prediction as a comment on each line.

const pairs = [
  [null, undefined],  // ?
  [null, 0],          // ?
  [0, "0"],           // ?
  [0, false],         // ?
  ["", false],        // ?
  [[], false],        // ?
  [[], ""],           // ?
  [null, false],      // ?
];

// Then implement abstractEqual below and verify your predictions.

// Write abstractEqual(a, b) that implements the abstract equality algorithm
// manually. Handle every type combination the spec defines.
// Hint: you will need to call toNumber() and toPrimitive() (defined below).
function abstractEqual(a, b) {
  // TODO: implement the == algorithm from the spec (handle all type combinations)
}

// ---------------------------------------------------------------------------
// Task 2: ToPrimitive implementation
// ---------------------------------------------------------------------------
// Write toPrimitive(value, hint = 'default') that mimics the ECMAScript spec:
//   - If value is not an object, return it unchanged.
//   - If value has Symbol.toPrimitive, call it with the hint string.
//   - If hint is 'string':  try toString() first, then valueOf().
//   - If hint is 'number' or 'default': try valueOf() first, then toString().
//   - If neither returns a primitive, throw TypeError.
function toPrimitive(value, hint = 'default') {
  // TODO: implement ToPrimitive abstract operation
}

// ---------------------------------------------------------------------------
// Task 3: ToNumber implementation
// ---------------------------------------------------------------------------
// Write toNumber(value) that mimics the spec ToNumber abstract operation.
// Cover: undefined, null, boolean, string, symbol (throw), object (delegate).
// For strings: empty → 0, whitespace-only → 0, valid numeric → parsed value,
//              invalid → NaN.
function toNumber(value) {
  // TODO: implement ToNumber abstract operation
}

// ---------------------------------------------------------------------------
// Task 4: Custom [Symbol.toPrimitive]
// ---------------------------------------------------------------------------
// Create a Money class whose Symbol.toPrimitive:
//   - Returns "$X.XX"  when hint is 'string'
//   - Returns the numeric amount when hint is 'number'
//   - Returns the numeric amount when hint is 'default'
// Demonstrate all three hints in practice:
//   `${money}`        → string hint (template literal)
//   +money            → number hint (unary +)
//   money + 0         → default hint (+  operator)
//   money == 10       → default hint (== with primitive on one side)
class Money {
  constructor(amount, currency = 'USD') {
    this.amount = amount;
    this.currency = currency;
  }

  [Symbol.toPrimitive](hint) {
    // TODO: implement
  }
}
