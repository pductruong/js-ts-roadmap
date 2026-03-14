interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  age: number;
  createdAt: Date;
}

type UpdateUser = { id: number } & Partial<Omit<User, "id">>;
type PublicUser = Omit<User, "password">;
type UserSummary = Pick<User, "id" | "name">;
type FrozenUser = Readonly<User>;
type Config = Record<string, string | number | boolean>;

function update<T>(original: T, changes: Partial<T>): T {
  return { ...original, ...changes };
}

function toPublicUser(user: User): PublicUser {
  const { password: _, ...publicUser } = user;
  return publicUser;
}

const user: User = {
  id: 1, name: "Alice", email: "alice@test.com",
  password: "secret", age: 30, createdAt: new Date(),
};

const updated = update(user, { name: "Alicia", age: 31 });
console.log(updated.name, updated.age);
console.log(updated.email);
const pub = toPublicUser(user);
console.log(pub.name);
const config: Config = { host: "localhost", port: 3000, debug: true };
console.log(config);
