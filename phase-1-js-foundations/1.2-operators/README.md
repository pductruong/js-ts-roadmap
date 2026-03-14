# 1.2 Operators

## Concepts

### Arithmetic
```js
5 + 2   // 7
5 - 2   // 3
5 * 2   // 10
5 / 2   // 2.5
5 % 2   // 1  (remainder)
5 ** 2  // 25 (exponentiation)
```

### Comparison
```js
5 == "5"   // true  (loose, coerces types)
5 === "5"  // false (strict, no coercion) — always prefer ===
5 != "5"   // false
5 !== "5"  // true
5 > 3      // true
5 >= 5     // true
```

### Logical
```js
true && false  // false
true || false  // true
!true          // false
```

Short-circuit evaluation:
```js
null && "hello"     // null   (stops at null)
null || "hello"     // "hello" (null is falsy, moves on)
"hi" && "hello"     // "hello" (both truthy, returns last)
```

### Ternary
```js
const label = age >= 18 ? "adult" : "minor";
```

### Nullish Coalescing `??`
Returns right side only when left is `null` or `undefined` (not `0` or `""`).
```js
const name = user.name ?? "Anonymous";
0 ?? "default"    // 0   (0 is not null/undefined)
0 || "default"    // "default" (0 is falsy — different!)
```

### Optional Chaining `?.`
Safely access nested properties without throwing if a middle value is null/undefined.
```js
const city = user?.address?.city;   // undefined instead of TypeError
const first = arr?.[0];
const result = obj?.method?.();
```

## Resources
- [javascript.info: Operators](https://javascript.info/operators)
- [javascript.info: Comparisons](https://javascript.info/comparison)
- [javascript.info: Logical operators](https://javascript.info/logical-operators)
- [javascript.info: Nullish coalescing](https://javascript.info/nullish-coalescing-operator)
- [javascript.info: Optional chaining](https://javascript.info/optional-chaining)

## Exercises
Go to the [exercises](./exercises/) folder.
