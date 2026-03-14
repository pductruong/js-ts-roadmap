# 5.11 ECMAScript Specification Internals

Target audience: senior and principal engineers who need to reason from first principles about JavaScript's behaviour — not just "it works this way" but "the spec says this because…"

---

## 1. Abstract Equality Algorithm (`==`)

The `==` operator does not compare values the same way `===` does. Instead it runs the **Abstract Equality Comparison** algorithm defined in the ECMAScript spec (ECMA-262 §7.2.15). Understanding each step lets you predict any `==` result without running the code.

### The 12-step algorithm

Given `x == y`:

| Step | Condition | Result |
|------|-----------|--------|
| 1 | `Type(x) === Type(y)` | Run **Strict Equality** (`===`) and return its result |
| 2 | `x` is `null` and `y` is `undefined` | `true` |
| 3 | `x` is `undefined` and `y` is `null` | `true` |
| 4 | `x` is `null` or `undefined` and `y` is neither | `false` |
| 5 | `x` is neither `null` nor `undefined` and `y` is `null` or `undefined` | `false` |
| 6 | `Type(x)` is Number or BigInt and `Type(y)` is String | `x == ToNumber(y)` (recurse) |
| 7 | `Type(x)` is String and `Type(y)` is Number or BigInt | `ToNumber(x) == y` (recurse) |
| 8 | `Type(x)` is Boolean | `ToNumber(x) == y` (recurse) |
| 9 | `Type(y)` is Boolean | `x == ToNumber(y)` (recurse) |
| 10 | `Type(x)` is String, Number, BigInt, or Symbol and `Type(y)` is Object | `x == ToPrimitive(y)` (recurse) |
| 11 | `Type(x)` is Object and `Type(y)` is String, Number, BigInt, or Symbol | `ToPrimitive(x) == y` (recurse) |
| 12 | Otherwise | `false` |

### Worked examples

```js
null == undefined  // Step 2/3 → true
null == 0          // Step 4/5 → false  (null only == null/undefined)
0 == "0"           // Step 6: 0 == ToNumber("0") → 0 == 0 → true
0 == false         // Step 8: ToNumber(false)=0, then 0 == 0 → true
"" == false        // Step 9: ToNumber(false)=0 → "" == 0
                   // Step 7: ToNumber("")=0 → 0 == 0 → true
[] == false        // Step 9: ToNumber(false)=0 → [] == 0
                   // Step 11: ToPrimitive([])="" → "" == 0
                   // Step 7: ToNumber("")=0 → 0 == 0 → true
[] == ""           // Step 11: ToPrimitive([])="" → "" == "" → true
null == false      // Step 4/5: null is compared to non-null/undefined → false
```

### Why `null` is its own island

Steps 4 and 5 act as a hard guard: if either side is `null` or `undefined` and the other is not the complementary value, the result is immediately `false`. This is why `null == false` is `false` even though `null` is falsy.

---

## 2. Abstract Operations

Abstract operations are internal spec functions that are not directly callable from JavaScript but underlie every coercion the language performs.

### `ToNumber(argument)`

Converts any value to a Number.

| Input type | Result |
|------------|--------|
| `undefined` | `NaN` |
| `null` | `+0` |
| `true` | `1` |
| `false` | `+0` |
| Number | argument (identity) |
| String | Parsed as numeric literal; `""` → `0`; invalid → `NaN` |
| Symbol | Throws `TypeError` |
| Object | `ToNumber(ToPrimitive(argument, "number"))` |

```js
ToNumber(undefined)  // NaN
ToNumber(null)       // 0
ToNumber(true)       // 1
ToNumber("")         // 0
ToNumber("  42  ")   // 42  (leading/trailing whitespace stripped)
ToNumber("0x1F")     // 31  (hex literals recognised)
ToNumber([])         // 0   (ToPrimitive([]) = "", ToNumber("") = 0)
ToNumber([3])        // 3   (ToPrimitive([3]) = "3", ToNumber("3") = 3)
ToNumber({})         // NaN (ToPrimitive({}) = "[object Object]")
```

### `ToString(argument)`

Converts any value to a String.

| Input type | Result |
|------------|--------|
| `undefined` | `"undefined"` |
| `null` | `"null"` |
| `true` | `"true"` |
| `false` | `"false"` |
| Number | Numeric string representation (special: `NaN` → `"NaN"`, `-0` → `"0"`) |
| Symbol | Throws `TypeError` |
| Object | `ToString(ToPrimitive(argument, "string"))` |

```js
ToString(-0)    // "0"  (−0 loses its sign)
ToString(NaN)   // "NaN"
ToString(null)  // "null"
ToString({})    // "[object Object]"
```

### `ToBoolean(argument)`

Converts any value to a Boolean. There is no coercion chain — the conversion is a direct lookup.

**Falsy values** (everything else is truthy):
- `undefined`
- `null`
- `+0`, `-0`, `NaN`
- `""` (empty string)
- `false`
- `0n` (BigInt zero)

```js
ToBoolean([])   // true  — arrays are always truthy even if empty
ToBoolean({})   // true  — same for objects
ToBoolean("0")  // true  — non-empty string
ToBoolean(0)    // false
```

### `ToPrimitive(input, preferredType?)`

Converts an object to a primitive value. This is the gateway between the object world and the primitive world.

```
ToPrimitive(input, hint):
  1. If input is already primitive, return it.
  2. Let exoticToPrim = GetMethod(input, @@toPrimitive).
  3. If exoticToPrim is not undefined:
       return exoticToPrim.call(input, hint-string).
  4. If hint is "default", set hint to "number".
  5. Return OrdinaryToPrimitive(input, hint).

OrdinaryToPrimitive(O, hint):
  if hint is "string": methodNames = ["toString", "valueOf"]
  if hint is "number": methodNames = ["valueOf", "toString"]
  For each name in methodNames:
    Let method = Get(O, name).
    If method is callable:
      Let result = Call(method, O).
      If result is primitive, return result.
  Throw TypeError.
```

### `ToObject(argument)`

Wraps primitives in their corresponding wrapper objects (this is what makes property access on primitives work). Throws `TypeError` for `null` and `undefined`.

| Input | Result |
|-------|--------|
| Boolean | `new Boolean(argument)` |
| Number | `new Number(argument)` |
| String | `new String(argument)` |
| Symbol | `new Symbol(argument)` |
| Object | argument (identity) |

---

## 3. ToPrimitive in Depth

### Hint values

The `hint` parameter tells the object which primitive type the caller prefers. There are three legal hint strings:

| Hint | When used |
|------|-----------|
| `"number"` | Arithmetic operators, `ToNumber` on an object |
| `"string"` | Template literals, `ToString` on an object, property key coercion |
| `"default"` | `+` operator (ambiguous add/concat), `==` with a primitive on one side, `Date` exception |

The `"default"` hint behaves identically to `"number"` for ordinary objects. `Date` objects override this behaviour to prefer strings.

### `valueOf` vs `toString` order

When no `Symbol.toPrimitive` exists:

```
hint "number"  → valueOf() first, then toString()
hint "string"  → toString() first, then valueOf()
hint "default" → valueOf() first, then toString()  (same as "number")
```

The method is only used if it returns a **primitive**. If `valueOf()` returns an object, the engine ignores it and tries `toString()`, and vice versa.

### `Symbol.toPrimitive`

`Symbol.toPrimitive` is a well-known symbol that lets any object take full control of all three hints with a single method.

```js
class Temperature {
  constructor(celsius) { this.celsius = celsius; }

  [Symbol.toPrimitive](hint) {
    if (hint === 'string')  return `${this.celsius}°C`;
    if (hint === 'number')  return this.celsius;
    // 'default' — used by + and ==
    return this.celsius;
  }
}

const t = new Temperature(100);
`Boiling: ${t}`   // "Boiling: 100°C"   (string hint from template literal)
t + 0             // 100                 (default hint from +, falls to number)
t > 99            // true                (number hint from >)
```

When `Symbol.toPrimitive` is present, `valueOf` and `toString` are never consulted for primitive conversion (though they may still be called directly).

### Practical trap: `Date` and `"default"` hint

`Date.prototype[Symbol.toPrimitive]` maps `"default"` to `"string"` rather than `"number"`. This means:

```js
const d = new Date('2024-01-01');
d + 1   // "Mon Jan 01 2024 ... 1"  (string concat, not addition)
+d      // 1704067200000            (unary + forces "number" hint)
```

---

## 4. Property Access Internals

Every property access in JavaScript is mediated by internal methods called **essential internal methods**. These are defined in the spec as double-bracket notation.

### Key internal methods

| Method | Signature | Purpose |
|--------|-----------|---------|
| `[[Get]]` | `(key, receiver)` | Read a property value |
| `[[Set]]` | `(key, value, receiver)` | Write a property value |
| `[[HasProperty]]` | `(key)` | Check if property exists (own or inherited) |
| `[[Delete]]` | `(key)` | Remove an own property |
| `[[GetOwnProperty]]` | `(key)` | Return the property descriptor or `undefined` |
| `[[DefineOwnProperty]]` | `(key, descriptor)` | Create or update an own property |
| `[[OwnPropertyKeys]]` | `()` | Return all own property keys |

### `[[Get]](key, receiver)`

```
OrdinaryGet(O, P, receiver):
  1. Let desc = O.[[GetOwnProperty]](P).
  2. If desc is undefined:
       a. Let parent = O.[[GetPrototypeOf]]().
       b. If parent is null, return undefined.
       c. Return parent.[[Get]](P, receiver).    ← recursion up the chain
  3. If IsDataDescriptor(desc): return desc.[[Value]].
  4. (IsAccessorDescriptor) Let getter = desc.[[Get]].
  5. If getter is undefined, return undefined.
  6. Return Call(getter, receiver).              ← receiver = original object
```

The `receiver` argument matters for getters that use `this`: it is always the original object that the property was accessed on, not the prototype where the getter was found.

### `[[Set]](key, value, receiver)`

```
OrdinarySet(O, P, V, receiver):
  1. Let ownDesc = O.[[GetOwnProperty]](P).
  2. If ownDesc is undefined:
       a. Let parent = O.[[GetPrototypeOf]]().
       b. If parent is not null, return parent.[[Set]](P, V, receiver).
       c. ownDesc = {[[Value]]: undefined, [[Writable]]: true, ...} (default)
  3. If IsDataDescriptor(ownDesc):
       a. If ownDesc.[[Writable]] is false, return false.
       b. Let existingDesc = receiver.[[GetOwnProperty]](P).
       c. If existingDesc exists, update it on receiver; else CreateDataProperty.
  4. (IsAccessorDescriptor) Let setter = ownDesc.[[Set]].
  5. If setter is undefined, return false.
  6. Call(setter, receiver, [V]).
```

### `[[HasProperty]](key)` — the `in` operator

```
OrdinaryHasProperty(O, P):
  1. Let hasOwn = O.[[GetOwnProperty]](P).
  2. If hasOwn is not undefined, return true.
  3. Let parent = O.[[GetPrototypeOf]]().
  4. If parent is null, return false.
  5. Return parent.[[HasProperty]](P).           ← walks the chain
```

This is why `"toString" in {}` is `true`: `[[HasProperty]]` walks up to `Object.prototype`.

### `[[Delete]](key)` — the `delete` operator

```
OrdinaryDelete(O, P):
  1. Let desc = O.[[GetOwnProperty]](P).
  2. If desc is undefined, return true.          ← nothing to delete
  3. If desc.[[Configurable]] is true:
       Remove P from O's property list.
       Return true.
  4. Return false.                               ← non-configurable, cannot delete
```

`delete` only operates on **own** properties. It never walks the prototype chain. Deleting an inherited property from an instance does nothing (returns `true` but leaves the prototype untouched).

---

## 5. The Prototype Chain Lookup Algorithm

The prototype chain is a linked list of objects. Each object has a `[[Prototype]]` internal slot which is either `null` or another object.

### How `[[Get]]` walks the chain

```
Reading obj.x:

obj ──[[Prototype]]──▶ ObjProto ──[[Prototype]]──▶ Object.prototype ──[[Prototype]]──▶ null
 │                        │                              │
 └─ own props?            └─ own props?                  └─ own props?
    found → return           found → return                 found → return
    not found ↓              not found ↓                    not found → return undefined
```

Step by step for `obj.toString`:

1. Check `obj`'s own properties — not found.
2. Get `obj.[[Prototype]]` = `Object.prototype`.
3. Check `Object.prototype`'s own properties — found `toString` (a function).
4. It is a data descriptor — return the value.

### Property shadowing

When an object has an own property with the same name as one in its prototype chain, the own property **shadows** the prototype property. `[[Get]]` stops at the first match.

```js
const proto = { greet() { return 'hello from proto'; } };
const obj = Object.create(proto);
obj.greet = function() { return 'hello from obj'; };

obj.greet();  // "hello from obj" — own property found first, proto never consulted
```

### Prototype chain and `[[Set]]`

Writing `obj.x = value` does **not** simply mirror the read path. Key differences:

- If `x` is found as a non-writable data property on a prototype, the write **silently fails** in sloppy mode (throws `TypeError` in strict mode).
- If `x` is found as an accessor on a prototype, the **setter** is called with `receiver = obj`.
- If `x` is not found anywhere, a new own property is created on `obj` directly.

### Performance implication

Engines like V8 optimise property access through hidden classes (shapes). Long prototype chains increase the number of `[[GetOwnProperty]]` calls, but in practice engines cache the lookup result. Manual chain traversal (e.g. `for...in` or repeated `in` checks) across very deep chains does have a measurable cost.

---

## 6. `Object.create(null)` — Objects Without a Prototype

### What it does

```js
const bare = Object.create(null);
// bare.[[Prototype]] = null
// bare has NO prototype chain whatsoever
```

`bare` has no `toString`, no `valueOf`, no `hasOwnProperty`, no `constructor`. It is a truly empty object.

### Why it matters

#### 1. No prototype pollution via `__proto__`

```js
const config = {};
config['__proto__'] = { isAdmin: true };  // silently modifies Object.prototype in old engines!

const safeConfig = Object.create(null);
safeConfig['__proto__'] = { isAdmin: true };  // just a regular key called "__proto__"
```

#### 2. Safe string-keyed maps

When using a plain object as a lookup table, keys like `"constructor"`, `"toString"`, or `"hasOwnProperty"` collide with inherited properties:

```js
const counts = {};
counts['constructor']++;   // NaN — inherited value was a function
counts['toString']++;      // NaN

const safeCounts = Object.create(null);
safeCounts['constructor']++;  // NaN initially but NaN because undefined, not function
// More importantly: `'constructor' in safeCounts` is false — no inherited noise
```

#### 3. No false positives with `in` or `for...in`

```js
const dict = {};
'valueOf' in dict   // true (inherited) — misleading for a pure dictionary

const safeDict = Object.create(null);
'valueOf' in safeDict  // false — this is genuinely not a key in the dictionary
```

#### 4. `for...in` is clean

`for...in` iterates enumerable properties on the object **and** its prototype chain. With `Object.create(null)`, there is no prototype chain, so `for...in` only yields own properties — no need to guard with `hasOwnProperty`.

### When to use it

| Use case | `{}` | `Object.create(null)` |
|----------|------|-----------------------|
| General object | Yes | Overkill |
| String-keyed cache / lookup table | Risky | Yes |
| Receiving untrusted keys (user input, JSON) | Risky | Yes |
| Need `JSON.stringify` directly | Works | Works (no custom toJSON) |
| Need to call `obj.hasOwnProperty(key)` | Works | Throws — use `Object.hasOwn(obj, key)` |

### Gotcha: methods that assume a prototype

Some functions expect their argument to have `Object.prototype` methods:

```js
const bare = Object.create(null);
bare.toString()          // TypeError: bare.toString is not a function
String(bare)             // "[object Object]" — coerces via internal ToString
JSON.stringify(bare)     // "{}" — works fine
Object.keys(bare)        // []  — works fine
Object.hasOwn(bare, 'x') // false — the safe alternative to hasOwnProperty
```

Always use `Object.hasOwn(obj, key)` instead of `obj.hasOwnProperty(key)` when the object may have a null prototype.

---

## Key Takeaways

1. `==` follows a deterministic 12-step algorithm. Steps 4/5 protect `null`/`undefined` from any other coercion. Steps 8/9 convert Booleans to numbers first, which is the source of most surprises.

2. All object-to-primitive coercions go through `ToPrimitive`. Installing `Symbol.toPrimitive` gives you complete control over all three hints.

3. `[[Get]]` is recursive up the prototype chain; it stops at the first match or returns `undefined` at the end of the chain. Getters are called with the original receiver, not the prototype.

4. `[[Delete]]` is own-only and honourable — it will not delete non-configurable properties and will not touch prototype properties.

5. `Object.create(null)` produces a prototype-free object, making it the correct choice for safe string-keyed maps. Always pair it with `Object.hasOwn` instead of `hasOwnProperty`.
