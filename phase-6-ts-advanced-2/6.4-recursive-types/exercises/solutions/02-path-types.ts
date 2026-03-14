type Paths<T, Prefix extends string = ""> =
  T extends object
    ? { [K in keyof T & string]:
          | `${Prefix}${K}`
          | Paths<T[K], `${Prefix}${K}.`>
      }[keyof T & string]
    : never;

type PathValue<T, P extends string> =
  P extends `${infer K}.${infer Rest}`
    ? K extends keyof T ? PathValue<T[K], Rest> : never
    : P extends keyof T ? T[P] : never;

function get<T, P extends Paths<T>>(obj: T, path: P): PathValue<T, P> {
  return path.split(".").reduce((acc: any, key) => acc?.[key], obj) as PathValue<T, P>;
}

type AppState = {
  user: { name: string; address: { city: string; zip: string } };
  settings: { theme: "dark" | "light"; notifications: boolean };
};

const state: AppState = {
  user: { name: "Alice", address: { city: "Hanoi", zip: "100000" } },
  settings: { theme: "dark", notifications: true },
};

console.log(get(state, "user.name"));
console.log(get(state, "user.address.city"));
console.log(get(state, "settings.theme"));
