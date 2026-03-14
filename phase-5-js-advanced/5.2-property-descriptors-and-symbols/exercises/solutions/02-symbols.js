const META = Symbol("meta");

function createNode(value) {
  return { value, [META]: { createdAt: Date.now(), version: 1 } };
}
function getMeta(node) { return node[META]; }

const TAGGED = Symbol.for("mylib.tagged");
function tag(obj) {
  Object.defineProperty(obj, TAGGED, { value: true, enumerable: false, configurable: true, writable: false });
}
function isTagged(obj) { return obj[TAGGED] === true; }

function createIdGenerator() {
  let count = 0;
  return {
    next() { return Symbol(`id_${count++}`); },
    isId(sym) { return typeof sym === "symbol" && (sym.description ?? "").startsWith("id_"); },
  };
}

const obj = { name: "Alice", [Symbol("private")]: "secret", age: 30 };
console.log(Object.keys(obj));
console.log(Object.values(obj));
console.log(Object.getOwnPropertySymbols(obj));
console.log(Reflect.ownKeys(obj));

const node = createNode(42);
console.log(getMeta(node).version);
console.log("meta" in node);
const myObj = { x: 1 };
tag(myObj);
console.log(isTagged(myObj), isTagged({ x: 1 }));
console.log(Object.keys(myObj));
const gen = createIdGenerator();
const id1 = gen.next(); const id2 = gen.next();
console.log(id1 === id2, gen.isId(id1), gen.isId(Symbol("other")));
