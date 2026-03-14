# 2.5 Iterators & Generators

## Concepts

### The Iteration Protocol
An object is **iterable** if it has a `[Symbol.iterator]()` method that returns an **iterator** (an object with a `next()` method returning `{ value, done }`).

```js
const range = {
  from: 1,
  to: 5,
  [Symbol.iterator]() {
    let current = this.from;
    const to = this.to;
    return {
      next() {
        return current <= to
          ? { value: current++, done: false }
          : { value: undefined, done: true };
      }
    };
  }
};

for (const n of range) console.log(n); // 1 2 3 4 5
[...range]; // [1, 2, 3, 4, 5]
```

### Generators
A generator function (`function*`) returns a generator — an object that is both an iterable and an iterator. `yield` pauses execution and returns a value.

```js
function* range(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

for (const n of range(1, 5)) console.log(n); // 1 2 3 4 5
[...range(1, 5)]; // [1, 2, 3, 4, 5]
```

### Infinite generators
```js
function* naturals() {
  let n = 1;
  while (true) yield n++;
}

function take(n, iter) {
  const result = [];
  for (const val of iter) {
    result.push(val);
    if (result.length === n) break;
  }
  return result;
}

take(5, naturals()); // [1, 2, 3, 4, 5]
```

### Async generators
```js
async function* fetchPages(url) {
  let page = 1;
  while (true) {
    const data = await fetch(`${url}?page=${page}`);
    const json = await data.json();
    if (!json.length) break;
    yield json;
    page++;
  }
}

for await (const page of fetchPages(url)) {
  console.log(page);
}
```

## Resources
- [javascript.info: Iterables](https://javascript.info/iterable)
- [javascript.info: Generators](https://javascript.info/generators)
- [javascript.info: Async generators](https://javascript.info/async-iterators-generators)

## Exercises
Go to the [exercises](./exercises/) folder.
