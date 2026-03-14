# 1.1 Variables & Types

## Concepts

### Variable Declarations
- `var` — function-scoped, hoisted (avoid in modern JS)
- `let` — block-scoped, reassignable
- `const` — block-scoped, not reassignable (prefer this by default)

### Primitive Types
| Type | Example |
|---|---|
| `string` | `"hello"`, `'world'`, `` `template` `` |
| `number` | `42`, `3.14`, `NaN`, `Infinity` |
| `boolean` | `true`, `false` |
| `null` | `null` (intentional absence) |
| `undefined` | `undefined` (unintentionally missing) |
| `symbol` | `Symbol('id')` |
| `bigint` | `9007199254740991n` |

### Type Coercion
JavaScript automatically converts types in some situations — this causes bugs if you don't know the rules.

```js
"5" + 1    // "51"  (number coerced to string)
"5" - 1    // 4     (string coerced to number)
Boolean("") // false
Boolean(" ") // true
```

### `typeof`
```js
typeof "hello"    // "string"
typeof 42         // "number"
typeof null       // "object"  <-- famous JS quirk
typeof undefined  // "undefined"
typeof {}         // "object"
typeof []         // "object"
typeof function(){} // "function"
```

### Template Literals
```js
const name = "Alice";
const greeting = `Hello, ${name}! You are ${20 + 5} years old.`;
```

## Resources
- [MDN: var, let, const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#declarations)
- [javascript.info: Variables](https://javascript.info/variables)
- [javascript.info: Data types](https://javascript.info/types)
- [MDN: Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)

## Exercises
Go to the [exercises](./exercises/) folder.
