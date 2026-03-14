// Exercise 1: Property Descriptors
// ----------------------------------

// 1a. Create an object with a non-writable, non-enumerable `_id` property
// and a normal `name` property.
function createEntity(id, name) {
  const entity = {};
  // YOUR CODE HERE: define _id as non-writable, non-enumerable, non-configurable
  // define name as a normal writable, enumerable property
  return entity;
}

// 1b. Create a computed property using a getter/setter pair via defineProperty
// `fullName` getter: returns `${first} ${last}`
// `fullName` setter: splits on " " and sets first/last
function createPerson(first, last) {
  const person = { first, last };
  Object.defineProperty(person, "fullName", {
    // YOUR CODE HERE
    enumerable: true,
    configurable: true,
  });
  return person;
}

// 1c. Deep freeze — Object.freeze is shallow. Write a deepFreeze() function.
function deepFreeze(obj) {
  // YOUR CODE HERE: freeze obj and all nested objects recursively
}

// 1d. Write a function that copies ALL properties including non-enumerable ones
// (Object.assign and spread only copy enumerable properties)
function copyAll(source) {
  // YOUR CODE HERE: use Object.getOwnPropertyDescriptors
}

// Tests
const entity = createEntity(42, "Alice");
console.log(entity.name);     // "Alice"
console.log(Object.keys(entity)); // ["name"] — _id is non-enumerable
try { entity._id = 99; } catch (e) { console.log("Cannot modify _id"); }
// In strict mode this throws; in sloppy mode it silently fails
// (add "use strict"; at top to test)

const person = createPerson("John", "Doe");
console.log(person.fullName);       // "John Doe"
person.fullName = "Jane Smith";
console.log(person.first, person.last); // "Jane" "Smith"

const config = deepFreeze({ db: { host: "localhost", port: 5432 }, debug: true });
config.db.port = 9999; // silently fails (frozen)
console.log(config.db.port); // 5432

const src = {};
Object.defineProperty(src, "secret", { value: "hidden", enumerable: false, writable: true, configurable: true });
src.name = "visible";
const copy = copyAll(src);
const desc = Object.getOwnPropertyDescriptor(copy, "secret");
console.log(desc.value);      // "hidden"
console.log(desc.enumerable); // false
