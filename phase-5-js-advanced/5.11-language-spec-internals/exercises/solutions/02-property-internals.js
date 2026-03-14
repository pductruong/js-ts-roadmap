// 5.11 Solutions — Property Internals
// =====================================
// Reference: ECMA-262 §10.1.8 OrdinaryGet, §10.1.9 OrdinarySet,
//            §10.1.10 OrdinaryHasProperty, §10.1.11 OrdinaryDelete

'use strict';

// ---------------------------------------------------------------------------
// Task 1: specGet — mimics OrdinaryGet internal method
// ---------------------------------------------------------------------------
// ECMA-262 §10.1.8:
//   1. Let desc = O.[[GetOwnProperty]](P).
//   2. If desc is undefined:
//        a. Let parent = O.[[GetPrototypeOf]]().
//        b. If parent is null, return undefined.
//        c. Return parent.[[Get]](P, receiver).   ← receiver stays fixed
//   3. If IsDataDescriptor(desc): return desc.[[Value]].
//   4. Let getter = desc.[[Get]].
//   5. If getter is undefined, return undefined.
//   6. Return Call(getter, receiver).
//
// The key insight: `receiver` is ALWAYS the original object, even as we climb
// the prototype chain. This means a getter defined on a prototype accesses
// the instance's own properties via `this`.

function specGet(obj, key) {
  // We carry the original receiver through all recursive calls.
  function get(current, receiver) {
    if (current === null) return undefined;

    const desc = Object.getOwnPropertyDescriptor(current, key);

    if (desc === undefined) {
      // Not found on this object — climb the chain
      const parent = Object.getPrototypeOf(current);
      return get(parent, receiver);
    }

    // Data descriptor: has [[Value]] (and [[Writable]])
    if (Object.prototype.hasOwnProperty.call(desc, 'value')) {
      return desc.value;
    }

    // Accessor descriptor: has [[Get]] (and/or [[Set]])
    const getter = desc.get;
    if (getter === undefined) return undefined;
    return getter.call(receiver); // ← receiver = original object
  }

  return get(obj, obj);
}

// ---------------------------------------------------------------------------
// Task 2: propertyExists
// ---------------------------------------------------------------------------
function propertyExists(obj, key, mode) {
  switch (mode) {
    case 'own':
      // Object.hasOwn is the safe equivalent of obj.hasOwnProperty(key)
      // It works even when obj has a null prototype.
      return Object.hasOwn(obj, key);

    case 'inherited':
      // Inherited means: present in the chain but NOT as an own property
      return (key in obj) && !Object.hasOwn(obj, key);

    case 'any':
      // `in` operator calls [[HasProperty]], which walks the entire chain.
      return key in obj;

    default:
      throw new TypeError(`Unknown mode: ${mode}. Use 'own', 'inherited', or 'any'.`);
  }
}

// ---------------------------------------------------------------------------
// Task 3: createSafeDict
// ---------------------------------------------------------------------------
function createSafeDict() {
  // The underlying store has NO prototype — arbitrary keys are completely safe.
  const store = Object.create(null);

  // We return a regular object whose methods close over `store`.
  // The methods themselves live on a normal object so they won't clash
  // with user keys stored in `store`.
  const dict = {
    get(key) {
      return store[key];
    },

    set(key, value) {
      store[key] = value;
      return dict; // enable chaining
    },

    has(key) {
      // Object.hasOwn works on null-prototype objects.
      return Object.hasOwn(store, key);
    },

    delete(key) {
      if (!Object.hasOwn(store, key)) return false;
      delete store[key];
      return true;
    },

    keys() {
      return Object.keys(store);
    },

    get size() {
      return Object.keys(store).length;
    },
  };

  return dict;
}

// ---------------------------------------------------------------------------
// Task 4: describeProperty
// ---------------------------------------------------------------------------
function describeProperty(obj, key) {
  // First check if it is an own property of obj itself.
  const ownDesc = Object.getOwnPropertyDescriptor(obj, key);

  if (ownDesc !== undefined) {
    if (Object.prototype.hasOwnProperty.call(ownDesc, 'value')) {
      // Data descriptor
      return (
        `own data: writable=${ownDesc.writable}, ` +
        `enumerable=${ownDesc.enumerable}, ` +
        `configurable=${ownDesc.configurable}, ` +
        `value=${JSON.stringify(ownDesc.value)}`
      );
    } else {
      // Accessor descriptor
      return (
        `own accessor: getter=${ownDesc.get ? 'yes' : 'no'}, ` +
        `setter=${ownDesc.set ? 'yes' : 'no'}, ` +
        `enumerable=${ownDesc.enumerable}, ` +
        `configurable=${ownDesc.configurable}`
      );
    }
  }

  // Not an own property — walk the prototype chain to find where it lives.
  let proto = Object.getPrototypeOf(obj);
  while (proto !== null) {
    const desc = Object.getOwnPropertyDescriptor(proto, key);
    if (desc !== undefined) {
      // Found it on this prototype. Try to give a friendly name.
      let protoName = 'unknown';
      if (proto.constructor && proto.constructor.name) {
        protoName = `${proto.constructor.name}.prototype`;
      }
      return `inherited from ${protoName}`;
    }
    proto = Object.getPrototypeOf(proto);
  }

  return 'not found';
}

// ---------------------------------------------------------------------------
// Demonstrations
// ---------------------------------------------------------------------------

console.log('=== Task 1: specGet (mimicking [[Get]]) ===');
console.log();

// Setup: getter on proto, own data on child
const proto1 = {
  get doubled() { return this._x * 2; },
  greet() { return `Hello, I am ${this.name}`; },
};
const child1 = Object.create(proto1);
child1._x = 5;
child1.name = 'child';

console.log('  child1._x = 5, proto has getter `doubled` that returns this._x * 2');
console.log('  specGet(child1, "doubled")  →', specGet(child1, 'doubled'));
// 10 — getter found on proto, called with child1 as receiver, reads child1._x
console.log('  child1.doubled (native)     →', child1.doubled);
// 10 — same result

console.log('  specGet(child1, "greet")    →', typeof specGet(child1, 'greet'));
// function — inherited data property
console.log('  specGet(child1, "toString") →', typeof specGet(child1, 'toString'));
// function — reached Object.prototype
console.log('  specGet(child1, "missing")  →', specGet(child1, 'missing'));
// undefined — chain exhausted

// Receiver matters: two children sharing the same getter
const child2 = Object.create(proto1);
child2._x = 100;
child2.name = 'child2';

console.log();
console.log('  Two children sharing the same getter (receiver matters):');
console.log('  specGet(child1, "doubled") →', specGet(child1, 'doubled')); // 10
console.log('  specGet(child2, "doubled") →', specGet(child2, 'doubled')); // 200

// ---------------------------------------------------------------------------

console.log();
console.log('=== Task 2: propertyExists ===');
console.log();

const arr = [1, 2, 3];

const existsCases = [
  [arr, 'length',   'own',       true],
  [arr, 'push',     'own',       false],
  [arr, 'push',     'inherited', true],
  [arr, 'push',     'any',       true],
  [arr, 'missing',  'any',       false],
  [arr, 'toString', 'inherited', true],
  [arr, '0',        'own',       true],
];

existsCases.forEach(([obj, key, mode, expected]) => {
  const result = propertyExists(obj, key, mode);
  const label = result === expected ? 'PASS' : 'FAIL';
  console.log(`  propertyExists(arr, "${key}", "${mode}") → ${result}  [${label}]`);
});

console.log();
console.log('  Why `in` differs from hasOwn:');
console.log('  "valueOf" in {}            →', 'valueOf' in {});               // true
console.log('  Object.hasOwn({}, "valueOf") →', Object.hasOwn({}, 'valueOf')); // false
console.log('  {} has valueOf only because it inherited it from Object.prototype');

// Null-prototype object: hasOwnProperty itself is missing, Object.hasOwn still works
const bare = Object.create(null);
bare.key = 'value';
console.log();
console.log('  Null-prototype object (Object.create(null)):');
console.log('  Object.hasOwn(bare, "key")  →', Object.hasOwn(bare, 'key')); // true
try {
  bare.hasOwnProperty('key');
} catch (e) {
  console.log('  bare.hasOwnProperty("key") → throws TypeError:', e.message);
}

// ---------------------------------------------------------------------------

console.log();
console.log('=== Task 3: createSafeDict ===');
console.log();

const dict = createSafeDict();

// Normal usage
dict.set('name', 'Alice').set('age', 30).set('city', 'London');
console.log('  After set("name","Alice"), set("age",30), set("city","London"):');
console.log('  dict.get("name")  →', dict.get('name'));   // Alice
console.log('  dict.get("age")   →', dict.get('age'));    // 30
console.log('  dict.has("city")  →', dict.has('city'));   // true
console.log('  dict.has("email") →', dict.has('email'));  // false
console.log('  dict.size         →', dict.size);          // 3
console.log('  dict.keys()       →', dict.keys());        // ['name', 'age', 'city']

dict.delete('city');
console.log('  After delete("city"):');
console.log('  dict.size         →', dict.size);          // 2
console.log('  dict.has("city")  →', dict.has('city'));   // false

console.log();
console.log('  Safety: using reserved/dangerous key names:');

// Setting "__proto__" as a key
dict.set('__proto__', { isAdmin: true });
console.log('  dict.set("__proto__", {isAdmin:true})');
console.log('  dict.get("__proto__")        →', dict.get('__proto__')); // {isAdmin:true}
console.log('  Object.prototype.isAdmin     →', (Object.prototype as any).isAdmin);     // undefined — NOT polluted

// Compare with a regular object
const unsafeDict: Record<string, any> = {};
console.log();
console.log('  Contrast: in a plain {} the "__proto__" assignment behavior');
console.log('  (This is now safe in modern engines due to JSON.parse etc,');
console.log('   but the intent is still error-prone in dynamic key scenarios.)');

// Setting "constructor", "toString" etc. as keys — doesn't break the dict
dict.set('constructor', 'my-value');
dict.set('toString', 'another-value');
dict.set('hasOwnProperty', 'yet-another');
console.log('  dict.get("constructor")  →', dict.get('constructor'));   // "my-value"
console.log('  dict.get("toString")     →', dict.get('toString'));      // "another-value"
console.log('  dict.size                →', dict.size);                 // 5 (name,age,__proto__,constructor,toString,hasOwnProperty)

// No inherited noise — "valueOf" is not present
console.log();
console.log('  No inherited noise:');
console.log('  dict.has("valueOf")      →', dict.has('valueOf'));   // false
// Note: we cannot use `"valueOf" in dict` because dict itself is a plain object
// with methods. The STORE is null-prototype; that is what matters.
// We can demonstrate with the raw store:
const storeRef = Object.create(null);
storeRef['key'] = 1;
console.log('  "valueOf" in Object.create(null) store →', 'valueOf' in storeRef); // false

// ---------------------------------------------------------------------------

console.log();
console.log('=== Task 4: describeProperty ===');
console.log();

// Own data property
const plain = { x: 42 };
console.log('  plain = { x: 42 }');
console.log('  describeProperty(plain, "x")         →', describeProperty(plain, 'x'));

// Non-writable, non-configurable
const frozen = Object.defineProperty({}, 'PI', {
  value: 3.14159,
  writable: false,
  enumerable: true,
  configurable: false,
});
console.log('  frozen.PI (non-writable, configurable=false):');
console.log('  describeProperty(frozen, "PI")       →', describeProperty(frozen, 'PI'));

// Own accessor
const withGetter = Object.defineProperty({}, 'now', {
  get() { return Date.now(); },
  enumerable: false,
  configurable: true,
});
console.log('  Object with own getter "now":');
console.log('  describeProperty(withGetter, "now")  →', describeProperty(withGetter, 'now'));

// Own accessor with both getter and setter
const temp: Record<string, any> = {};
let _celsius = 0;
Object.defineProperty(temp, 'celsius', {
  get() { return _celsius; },
  set(v) { _celsius = v; },
  enumerable: true,
  configurable: true,
});
console.log('  temp.celsius (getter + setter):');
console.log('  describeProperty(temp, "celsius")    →', describeProperty(temp, 'celsius'));

// Inherited from Array.prototype
const arr2 = [1, 2, 3];
console.log('  [].push:');
console.log('  describeProperty(arr2, "push")       →', describeProperty(arr2, 'push'));
console.log('  [].length:');
console.log('  describeProperty(arr2, "length")     →', describeProperty(arr2, 'length'));

// Inherited from Object.prototype
console.log('  {}.toString:');
console.log('  describeProperty({}, "toString")     →', describeProperty({}, 'toString'));

// Not found
console.log('  {}.missing:');
console.log('  describeProperty({}, "missing")      →', describeProperty({}, 'missing'));

// Null-prototype object
const nullProto = Object.create(null);
nullProto.foo = 'bar';
console.log('  Object.create(null).foo:');
console.log('  describeProperty(nullProto, "foo")   →', describeProperty(nullProto, 'foo'));
console.log('  Object.create(null).missing:');
console.log('  describeProperty(nullProto, "missing") →', describeProperty(nullProto, 'missing'));
