// Exercise 1: Proxy Basics
// -------------------------

// 1a. Create a validator proxy
// Intercept `set` to enforce that:
// - `age` must be a number between 0 and 150
// - `name` must be a non-empty string
// Throw a TypeError if validation fails.
function createValidatedUser() {
  const target = {};
  return new Proxy(target, {
    set(target, key, value, receiver) {
      if (key === "age") {
        if (typeof value !== "number" || value < 0 || value > 150) {
          throw new TypeError(`Invalid age: ${value}`);
        }
      }
      if (key === "name") {
        // YOUR CODE HERE: validate non-empty string
      }
      return Reflect.set(target, key, value, receiver);
    },
  });
}

// 1b. Create a default-value proxy
// When accessing a property that doesn't exist, return a default value instead of undefined.
function withDefaults(target, defaults) {
  return new Proxy(target, {
    get(target, key, receiver) {
      // YOUR CODE HERE
    },
  });
}

// 1c. Create a read-only proxy — throw on any set or delete
function readOnly(target) {
  return new Proxy(target, {
    // YOUR CODE HERE
  });
}

// 1d. Create a logging proxy — log every get and set with the property name and value
function withLogging(target, label) {
  return new Proxy(target, {
    // YOUR CODE HERE
  });
}

// Tests
const user = createValidatedUser();
user.name = "Alice";
user.age = 30;
console.log(user.name, user.age); // Alice 30
try { user.age = 200; } catch (e) { console.log(e.message); } // Invalid age: 200
try { user.name = ""; }  catch (e) { console.log(e.message); }

const config = withDefaults({ host: "localhost" }, { port: 3000, debug: false });
console.log(config.host);  // "localhost"
console.log(config.port);  // 3000
console.log(config.debug); // false

const frozen = readOnly({ x: 1, y: 2 });
console.log(frozen.x); // 1
try { frozen.x = 99; } catch (e) { console.log(e.message); }

const logged = withLogging({ count: 0 }, "counter");
logged.count = 5;
logged.count;
