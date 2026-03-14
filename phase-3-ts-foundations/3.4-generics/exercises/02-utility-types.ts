// Exercise 2: Utility Types
// --------------------------

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  age: number;
  createdAt: Date;
}

// 2a. Create a type for updating a user (all fields optional except id)
type UpdateUser = // YOUR CODE HERE — use Omit + Partial or manual

// 2b. Create a PublicUser type that omits password
type PublicUser = // YOUR CODE HERE

// 2c. Create a UserSummary type with only id and name
type UserSummary = // YOUR CODE HERE

// 2d. Create a frozen (readonly) version of User
type FrozenUser = // YOUR CODE HERE

// 2e. Create a config map type: Record where keys are strings and values are string | number | boolean
type Config = // YOUR CODE HERE

// 2f. Write a generic update function
// Takes an object and a partial update, returns merged object (immutably)
function update<T>(original: T, changes: Partial<T>): T {
  // YOUR CODE HERE
}

// 2g. Write a function that strips the password from a user
function toPublicUser(user: User): PublicUser {
  // YOUR CODE HERE
}

// Tests
const user: User = {
  id: 1, name: "Alice", email: "alice@test.com",
  password: "secret", age: 30, createdAt: new Date(),
};

const updated = update(user, { name: "Alicia", age: 31 });
console.log(updated.name, updated.age); // "Alicia" 31
console.log(updated.email);             // "alice@test.com"

const pub = toPublicUser(user);
console.log(pub.name);    // "Alice"
// console.log(pub.password); // TypeScript Error!

const config: Config = { host: "localhost", port: 3000, debug: true };
console.log(config);
