# 5.9 Async & Generator Internals

## How async/await is desugared

`async/await` is syntactic sugar over generators + promises. Understanding the desugaring explains behavior like microtask scheduling and error propagation.

```js
// This async function:
async function fetchData(id) {
  const user = await getUser(id);
  const posts = await getPosts(user.id);
  return posts;
}

// Is roughly equivalent to:
function fetchData(id) {
  return new Promise((resolve, reject) => {
    function step(nextF, value) {
      let result;
      try { result = nextF(value); }
      catch (err) { reject(err); return; }
      if (result.done) { resolve(result.value); return; }
      Promise.resolve(result.value).then(
        val => step(gen.next.bind(gen), val),
        err => step(gen.throw.bind(gen), err)
      );
    }
    const gen = (function* () {
      const user  = yield getUser(id);
      const posts = yield getPosts(user.id);
      return posts;
    })();
    step(gen.next.bind(gen), undefined);
  });
}
```

## Generator Protocol — Full API

```js
function* gen() {
  const x = yield 1;   // pauses, sends 1 out; x receives whatever is passed to next()
  const y = yield 2;   // pauses, sends 2 out; y receives next call's argument
  return x + y;
}

const g = gen();
g.next();        // { value: 1, done: false } — starts, runs to first yield
g.next(10);      // { value: 2, done: false } — resumes, x = 10, runs to second yield
g.next(20);      // { value: 30, done: true  } — resumes, y = 20, returns 10+20

// Throwing into a generator
function* safegen() {
  try { yield 1; }
  catch (err) { console.log("caught:", err.message); yield 2; }
}
const sg = safegen();
sg.next();            // { value: 1 }
sg.throw(new Error("oops")); // logs "caught: oops", returns { value: 2 }

// Returning from a generator (closes it)
const rg = gen();
rg.next();       // { value: 1 }
rg.return(99);   // { value: 99, done: true } — closes generator
rg.next();       // { value: undefined, done: true } — exhausted
```

## yield* Delegation

```js
function* inner() { yield 1; yield 2; }
function* outer() {
  yield 0;
  yield* inner(); // delegates to inner — yields all its values
  yield 3;
}
[...outer()]; // [0, 1, 2, 3]

// yield* also forwards return value
function* counter() { return "done"; }
function* wrapper() {
  const result = yield* counter(); // result = "done" (the return value)
  yield result;
}
[...wrapper()]; // ["done"]
```

## Promise Resolution & Thenables

The Promise resolution procedure (`[[Resolve]](promise, x)`) handles thenables specially:

```js
// If x has a .then() method, it's treated as a thenable
// This is why resolving with a Promise flattens it
Promise.resolve(Promise.resolve(42)).then(v => console.log(v)); // 42 (not Promise<42>)

// Thenables (any object with .then) are assimilated:
const thenable = { then(resolve) { resolve(42); } };
Promise.resolve(thenable).then(v => console.log(v)); // 42

// Each .then() schedules a new microtask — this is why:
Promise.resolve()
  .then(() => Promise.resolve(1)) // creates a NESTED promise — adds 2 extra microtask ticks
  .then(v => console.log(v));     // runs 2 ticks later, not 1

// vs returning a plain value (1 tick)
Promise.resolve()
  .then(() => 1)
  .then(v => console.log(v));
```

## Resources
- [javascript.info: Generators](https://javascript.info/generators)
- [javascript.info: Async/await](https://javascript.info/async-await)
- [How async/await works internally](https://v8.dev/blog/fast-async)
- [The Promise Resolution Procedure](https://promisesaplus.com/#the-promise-resolution-procedure)

## Exercises
Go to the [exercises](./exercises/) folder.
