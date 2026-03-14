type IsArray<T> = T extends any[] ? true : false;
type Flatten<T> = T extends (infer E)[] ? E : T;
type UnwrapPromise<T> = T extends Promise<infer V> ? V : T;
type Nullable<T> = { [K in keyof T]: T[K] | null };
type Mutable<T> = { -readonly [K in keyof T]: T[K] };
type Getters<T> = { [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K] };

type User = { name: string; age: number };
type UserGetters = Getters<User>;

const testGetters: UserGetters = {
  getName: () => "Alice",
  getAge: () => 30,
};
console.log(testGetters.getName(), testGetters.getAge());
