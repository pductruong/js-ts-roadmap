// 5.11 Exercises — Property Internals
// =====================================
// Reference: ECMA-262 §10.1 (Ordinary Object Internal Methods)
//            §10.1.8 OrdinaryGet, §10.1.9 OrdinarySet,
//            §10.1.10 OrdinaryHasProperty, §10.1.11 OrdinaryDelete

'use strict';

// ---------------------------------------------------------------------------
// Task 1: Implement [[Get]] manually
// ---------------------------------------------------------------------------
// Write specGet(obj, key) that mimics the OrdinaryGet internal method:
//   - Walk the prototype chain using Object.getPrototypeOf()
//   - At each level use Object.getOwnPropertyDescriptor() to inspect the property
//   - If the descriptor is a data descriptor, return its [[Value]]
//   - If the descriptor is an accessor descriptor, call the getter with `obj`
//     as the receiver (this matters! the getter's `this` is always the original obj)
//   - Return undefined if the key is not found anywhere in the chain
//
// Test it against:
//   const proto = { get x() { return this._x * 2; } };
//   const child = Object.create(proto);
//   child._x = 5;
//   specGet(child, 'x')         // should return 10 (getter called with child as receiver)
//   specGet(child, 'toString')  // should return Object.prototype.toString (found on Object.prototype)
//   specGet(child, 'missing')   // should return undefined
function specGet(obj, key) {
  // TODO: implement [[Get]] prototype chain lookup with getter support
}

// ---------------------------------------------------------------------------
// Task 2: Property existence checks
// ---------------------------------------------------------------------------
// Demonstrate the difference between:
//   - `key in obj`              → [[HasProperty]]: checks own + inherited
//   - `obj.hasOwnProperty(key)` → own properties only
//   - `Object.hasOwn(obj, key)` → own properties only (safe, works on null-proto objects)
//
// Write propertyExists(obj, key, mode) where mode is:
//   'own'       → only true if obj has the property as its own (use Object.hasOwn)
//   'inherited' → only true if the property is inherited but NOT own
//   'any'       → true if property exists anywhere in the chain (use `in`)
//
// Verify with:
//   const arr = [1, 2, 3];
//   propertyExists(arr, 'length', 'own')        // true
//   propertyExists(arr, 'push', 'own')           // false
//   propertyExists(arr, 'push', 'inherited')     // true
//   propertyExists(arr, 'push', 'any')           // true
//   propertyExists(arr, 'missing', 'any')        // false
function propertyExists(obj, key, mode) {
  // TODO: implement based on mode
}

// ---------------------------------------------------------------------------
// Task 3: Safe dictionary
// ---------------------------------------------------------------------------
// Write createSafeDict() that returns an Object.create(null) based map.
// The returned object must have these methods:
//   get(key)           → return the stored value, or undefined
//   set(key, value)    → store the value, return the dict (for chaining)
//   has(key)           → return true if key is stored
//   delete(key)        → remove the key, return true if it existed
//   keys()             → return array of all stored keys
//   size               → (property, not method) number of stored keys
//
// Demonstrate why it is safer than {} for arbitrary keys by showing that:
//   - Setting "__proto__" as a key does NOT affect Object.prototype
//   - Setting "constructor", "hasOwnProperty", "valueOf", "toString" as keys
//     does not break the dictionary's own methods
//   - `'constructor' in dict` is false (no inherited noise)
function createSafeDict() {
  // TODO: return object with get/set/has/delete/keys and size using Object.create(null)
}

// ---------------------------------------------------------------------------
// Task 4: Property descriptor inspection
// ---------------------------------------------------------------------------
// Write describeProperty(obj, key) that returns a human-readable string:
//
//   Own data property:
//     "own data: writable=true, enumerable=true, configurable=true, value=42"
//
//   Own accessor property:
//     "own accessor: getter=yes, setter=no, enumerable=false, configurable=true"
//
//   Inherited property (not own):
//     "inherited from <ConstructorName>.prototype"
//     e.g. "inherited from Array.prototype" for [].push
//          "inherited from Object.prototype" for {}.toString
//
//   Not found at all:
//     "not found"
//
// Walk the chain using Object.getPrototypeOf() and Object.getOwnPropertyDescriptor().
// To get the constructor name of a prototype use:
//   proto.constructor && proto.constructor.name
function describeProperty(obj, key) {
  // TODO: use Object.getOwnPropertyDescriptor and walk prototype chain
}
