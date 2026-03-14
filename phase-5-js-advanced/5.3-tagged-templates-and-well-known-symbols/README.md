# 5.3 Tagged Templates & Well-known Symbols

## Concepts

### Tagged Template Literals
A tag is a function that receives the template parts and interpolated values.

```js
function tag(strings, ...values) {
  // strings: array of string parts
  // values: array of interpolated expressions
  return strings.reduce((result, str, i) => {
    return result + str + (values[i] !== undefined ? values[i] : "");
  }, "");
}

const name = "Alice";
const age = 30;
tag`Hello ${name}, you are ${age} years old`;
// strings: ["Hello ", ", you are ", " years old"]
// values:  ["Alice", 30]
```

### Real-world uses
```js
// SQL safe queries (prevent injection)
sql`SELECT * FROM users WHERE id = ${userId}`;

// GraphQL
gql`query { user(id: ${id}) { name } }`;

// CSS-in-JS
css`color: ${theme.primary}; font-size: ${size}px;`;

// i18n / translation
t`Welcome, ${user.name}!`;

// HTML escaping
html`<p>User input: ${userInput}</p>`;
```

### `String.raw`
Built-in tag that returns the raw string without processing escape sequences:
```js
String.raw`Hello\nWorld` // "Hello\\nWorld" — not a newline
```

---

## Well-known Symbols

Built-in Symbols that let you hook into JavaScript's core behaviors.

### Symbol.iterator
Makes an object iterable (usable in `for...of`, spread, destructuring).
```js
class Range {
  constructor(start, end) { this.start = start; this.end = end; }
  [Symbol.iterator]() {
    let current = this.start;
    const end = this.end;
    return { next: () => current <= end
      ? { value: current++, done: false }
      : { value: undefined, done: true }
    };
  }
}
[...new Range(1, 5)]; // [1, 2, 3, 4, 5]
```

### Symbol.toPrimitive
Controls how an object converts to a primitive (number, string, default).
```js
class Temperature {
  constructor(celsius) { this.celsius = celsius; }
  [Symbol.toPrimitive](hint) {
    if (hint === "number") return this.celsius;
    if (hint === "string") return `${this.celsius}°C`;
    return this.celsius; // default
  }
}
const t = new Temperature(100);
+t;          // 100  (number hint)
`${t}`;      // "100°C" (string hint)
t + 0;       // 100  (default hint)
```

### Symbol.hasInstance
Controls the behavior of `instanceof`.
```js
class EvenNumber {
  static [Symbol.hasInstance](value) {
    return typeof value === "number" && value % 2 === 0;
  }
}
2 instanceof EvenNumber;  // true
3 instanceof EvenNumber;  // false
```

### Symbol.toStringTag
Controls the output of `Object.prototype.toString.call(obj)`.
```js
class MyCollection {
  get [Symbol.toStringTag]() { return "MyCollection"; }
}
Object.prototype.toString.call(new MyCollection()); // "[object MyCollection]"
```

### Symbol.species
Controls which constructor is used when creating derived objects from methods like `.map()`, `.filter()`.

### Symbol.asyncIterator
Like `Symbol.iterator` but for async iterables (`for await...of`).

## Resources
- [javascript.info: Tagged templates](https://javascript.info/tagged-templates)
- [javascript.info: Symbol.iterator](https://javascript.info/symbol-iterator)
- [MDN: Well-known Symbols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol#well-known_symbols)

## Exercises
Go to the [exercises](./exercises/) folder.
