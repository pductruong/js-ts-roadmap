// Exercise 2: Symbols
// --------------------

// 2a. Use a Symbol as a "private" metadata key that libraries can't accidentally overwrite
const META = Symbol("meta");

function createNode(value) {
  return {
    value,
    [META]: { createdAt: Date.now(), version: 1 },
  };
}

function getMeta(node) {
  // YOUR CODE HERE: return the META symbol property
}

// 2b. Library-safe extension
// Imagine you're writing a library that needs to tag objects.
// Use Symbol.for() so your tag can be shared across modules.
const TAGGED = Symbol.for("mylib.tagged");

function tag(obj) {
  // YOUR CODE HERE: add a non-enumerable tagged symbol property set to true
}

function isTagged(obj) {
  // YOUR CODE HERE
}

// 2c. Create a unique ID generator using Symbol
// Each call returns a new Symbol with an auto-incremented label
function createIdGenerator() {
  let count = 0;
  return {
    next() {
      // YOUR CODE HERE: return Symbol(`id_${count++}`)
    },
    isId(sym) {
      // YOUR CODE HERE: return true if sym is a Symbol whose description starts with "id_"
    },
  };
}

// 2d. Show that Symbols are not included in normal enumeration
const obj = {
  name: "Alice",
  [Symbol("private")]: "secret",
  age: 30,
};

// Fill in expected results:
console.log(Object.keys(obj));                  // ?
console.log(Object.values(obj));                // ?
console.log(Object.getOwnPropertySymbols(obj)); // ?
console.log(Reflect.ownKeys(obj));              // ?

// Tests
const node = createNode(42);
const meta = getMeta(node);
console.log(meta.version);    // 1
console.log("meta" in node);  // false — string key doesn't exist

const myObj = { x: 1 };
tag(myObj);
console.log(isTagged(myObj));    // true
console.log(isTagged({ x: 1 })); // false
console.log(Object.keys(myObj));  // ["x"] — symbol not enumerated

const gen = createIdGenerator();
const id1 = gen.next();
const id2 = gen.next();
console.log(id1 === id2);       // false — unique
console.log(gen.isId(id1));     // true
console.log(gen.isId(Symbol("other"))); // false
