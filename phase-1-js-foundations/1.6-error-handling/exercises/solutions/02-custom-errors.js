class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}

class NotFoundError extends Error {
  constructor(resource) {
    super(`${resource} not found`);
    this.name = "NotFoundError";
    this.resource = resource;
  }
}

function validateUser(user) {
  if (!user.name || typeof user.name !== "string") {
    throw new ValidationError("name is required and must be a string", "name");
  }
  if (typeof user.age !== "number" || user.age < 0) {
    throw new ValidationError("age must be a non-negative number", "age");
  }
  if (!user.email || !user.email.includes("@")) {
    throw new ValidationError("email must contain @", "email");
  }
}

function findUser(users, id) {
  const user = users.find(u => u.id === id);
  if (!user) throw new NotFoundError("user");
  return user;
}

try {
  validateUser({ name: "Alice", age: 25, email: "alice@test.com" });
  console.log("Valid user");
} catch (err) {
  console.log(err.message);
}

try {
  validateUser({ age: 25, email: "test@test.com" });
} catch (err) {
  console.log(err instanceof ValidationError);
  console.log(err.field);
  console.log(err.message);
}

const users = [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }];
try {
  findUser(users, 99);
} catch (err) {
  console.log(err instanceof NotFoundError);
  console.log(err.resource);
  console.log(err.message);
}
