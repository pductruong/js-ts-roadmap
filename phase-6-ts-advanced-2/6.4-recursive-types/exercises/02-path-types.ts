// Exercise 2: Dot-notation Path Types
// -------------------------------------

// 2a. Paths<T> — all valid dot-notation paths in T
type Paths<T, Prefix extends string = ""> =
  T extends object
    ? { [K in keyof T & string]:
          | `${Prefix}${K}`
          | Paths<T[K], `${Prefix}${K}.`>
      }[keyof T & string]
    : never;

// 2b. PathValue<T, P> — the value type at a given path
type PathValue<T, P extends string> =
  P extends `${infer K}.${infer Rest}`
    ? K extends keyof T
      ? PathValue<T[K], Rest>
      : never
    : P extends keyof T
    ? T[P]
    : never;

// 2c. Use Paths and PathValue to build a type-safe get() function
function get<T, P extends Paths<T>>(obj: T, path: P): PathValue<T, P> {
  return path.split(".").reduce((acc: any, key) => acc?.[key], obj) as PathValue<T, P>;
}

// 2d. Use them with a real object type
type AppState = {
  user: {
    name: string;
    address: {
      city: string;
      zip: string;
    };
  };
  settings: {
    theme: "dark" | "light";
    notifications: boolean;
  };
};

// All valid paths:
type AppPaths = Paths<AppState>;
// "user" | "user.name" | "user.address" | "user.address.city" | "user.address.zip"
// | "settings" | "settings.theme" | "settings.notifications"

// Value at path:
type UserName = PathValue<AppState, "user.name">;     // string
type Theme    = PathValue<AppState, "settings.theme">; // "dark" | "light"

// Tests
const state: AppState = {
  user: { name: "Alice", address: { city: "Hanoi", zip: "100000" } },
  settings: { theme: "dark", notifications: true },
};

const name = get(state, "user.name");
const city = get(state, "user.address.city");
const theme = get(state, "settings.theme");

console.log(name);  // "Alice"
console.log(city);  // "Hanoi"
console.log(theme); // "dark"
// get(state, "user.invalid"); // TypeScript Error
