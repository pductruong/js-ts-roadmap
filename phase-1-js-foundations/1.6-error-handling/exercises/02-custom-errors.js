// Exercise 2: Custom Errors
// --------------------------

// 2a. Create a ValidationError class with a `field` property
class ValidationError extends Error {
  constructor(message, field) {
    // YOUR CODE HERE
  }
}

// 2b. Create a NotFoundError class with a `resource` property
class NotFoundError extends Error {
  constructor(resource) {
    // YOUR CODE HERE — message should be: "resource not found"
  }
}

// 2c. Validate a user object. Throw ValidationError for each missing required field.
function validateUser(user) {
  // Required fields: name (string), age (number >= 0), email (must contain @)
  // YOUR CODE HERE
}

// 2d. Find user by id from an array. Throw NotFoundError if not found.
function findUser(users, id) {
  // YOUR CODE HERE
}

// Tests
try {
  validateUser({ name: "Alice", age: 25, email: "alice@test.com" });
  console.log("Valid user");
} catch (err) {
  console.log(err.message);
}

try {
  validateUser({ age: 25, email: "test@test.com" });
} catch (err) {
  console.log(err instanceof ValidationError); // true
  console.log(err.field);                       // "name"
  console.log(err.message);
}

const users = [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }];
try {
  const user = findUser(users, 99);
} catch (err) {
  console.log(err instanceof NotFoundError); // true
  console.log(err.resource);                 // "user"
  console.log(err.message);                  // "user not found"
}
