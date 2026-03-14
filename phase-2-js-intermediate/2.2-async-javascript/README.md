# 2.2 Asynchronous JavaScript

## Concepts

### The Event Loop
JavaScript is single-threaded. Async operations (timers, fetch, file I/O) are handled by the runtime and their callbacks are queued to run after the current synchronous code finishes.

Execution order:
1. Synchronous code (call stack)
2. Microtasks (Promise callbacks, `queueMicrotask`)
3. Macrotasks (setTimeout, setInterval, I/O)

```js
console.log("1");
setTimeout(() => console.log("3"), 0);
Promise.resolve().then(() => console.log("2"));
// Output: 1, 2, 3
```

### Callbacks (old style)
```js
function fetchData(callback) {
  setTimeout(() => callback(null, "data"), 1000);
}
fetchData((err, data) => {
  if (err) return console.error(err);
  console.log(data);
});
```

### Promises
```js
const p = new Promise((resolve, reject) => {
  setTimeout(() => resolve("done"), 1000);
});

p.then(result => console.log(result))
 .catch(err => console.error(err))
 .finally(() => console.log("cleanup"));
```

### Promise combinators
```js
Promise.all([p1, p2, p3])         // wait for all, fail if any fails
Promise.allSettled([p1, p2, p3])  // wait for all, never fails
Promise.race([p1, p2])            // first to settle wins
Promise.any([p1, p2])             // first to resolve wins (ignores rejects)
```

### async / await
```js
async function loadUser(id) {
  try {
    const user = await fetchUser(id);      // wait for promise
    const posts = await fetchPosts(user);
    return posts;
  } catch (err) {
    console.error(err);
  }
}
```

> `await` can only be used inside `async` functions (or at top level in ES modules).

## Resources
- [javascript.info: Callbacks](https://javascript.info/callbacks)
- [javascript.info: Promises](https://javascript.info/promise-basics)
- [javascript.info: async/await](https://javascript.info/async-await)
- [javascript.info: Promise API](https://javascript.info/promise-api)
- [MDN: Event loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop)

## Exercises
Go to the [exercises](./exercises/) folder.
