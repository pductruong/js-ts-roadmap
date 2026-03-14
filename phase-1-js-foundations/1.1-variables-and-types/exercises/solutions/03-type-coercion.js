// Solutions: Type Coercion

console.log("5" + 1);        // "51"   — number coerced to string
console.log("5" - 1);        // 4      — string coerced to number
console.log(true + 1);       // 2      — true is 1
console.log(false + false);  // 0      — false is 0
console.log(null + 1);       // 1      — null is 0
console.log(undefined + 1);  // NaN   — undefined becomes NaN
console.log("" == false);    // true   — both coerce to 0
console.log("" === false);   // false  — different types, no coercion
console.log(Boolean(""));    // false  — empty string is falsy
console.log(Boolean("  "));  // true   — non-empty string is truthy
console.log(Boolean(0));     // false
console.log(Boolean([]));    // true   — objects (including arrays) are truthy

// Challenge
console.log([] + []);   // ""    — both arrays convert to ""
console.log([] + {});   // "[object Object]"
console.log({} + []);   // "[object Object]" (in expression context)
