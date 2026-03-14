// 1a. Predicted outputs:
console.log(0.1 + 0.2);           // 0.30000000000000004
console.log(0.1 + 0.2 === 0.3);   // false
console.log(0.3 - 0.1);           // 0.19999999999999998
console.log(1.005.toFixed(2));     // "1.00" (not "1.01"!) — binary representation issue
console.log(9007199254740992 === 9007199254740993); // true — above safe integer range
console.log(NaN === NaN);          // false
console.log(-0 === 0);             // true
console.log(typeof NaN);           // "number"
console.log(1 / 0);               // Infinity
console.log(-1 / 0);              // -Infinity
console.log(0 / 0);               // NaN

function floatEqual(a, b) {
  if (a === b) return true;
  const diff = Math.abs(a - b);
  const scale = Math.max(Math.abs(a), Math.abs(b), 1);
  return diff < Number.EPSILON * scale;
}

function isReallyNaN(value) { return Number.isNaN(value); }
function isNegativeZero(value) { return Object.is(value, -0); }

function sumMoney(...amounts) {
  const cents = amounts.reduce((sum, a) => sum + Math.round(a * 100), 0);
  return cents / 100;
}

function isSafeForInteger(n) { return Number.isSafeInteger(n); }

console.log("\n--- Float comparison ---");
console.log(floatEqual(0.1 + 0.2, 0.3));
console.log(floatEqual(0.1 + 0.2, 0.31));
console.log("\n--- NaN detection ---");
console.log(isReallyNaN(NaN));
console.log(isReallyNaN("hello"));
console.log(isReallyNaN(undefined));
console.log("\n--- Negative zero ---");
console.log(isNegativeZero(-0));
console.log(isNegativeZero(0));
console.log(isNegativeZero(-1));
console.log("\n--- Money sum ---");
console.log(sumMoney(0.1, 0.2));
console.log(sumMoney(0.1, 0.2, 0.3));
console.log(sumMoney(1.99, 2.01));
console.log("\n--- Safe integers ---");
console.log(isSafeForInteger(42));
console.log(isSafeForInteger(Number.MAX_SAFE_INTEGER));
console.log(isSafeForInteger(Number.MAX_SAFE_INTEGER + 1));
