// Exercise 1: Conditional Types & Mapped Types
// ---------------------------------------------

// 1a. IsArray<T> — true if T is an array, false otherwise
type IsArray<T> = // YOUR CODE HERE

type TestIsArray1 = IsArray<number[]>;  // should be true
type TestIsArray2 = IsArray<string>;    // should be false

// 1b. Flatten<T> — if T is an array, get its element type; otherwise T itself
type Flatten<T> = // YOUR CODE HERE

type TestFlatten1 = Flatten<number[]>;  // number
type TestFlatten2 = Flatten<string>;    // string

// 1c. UnwrapPromise<T> — extract the resolved type of a Promise
type UnwrapPromise<T> = // YOUR CODE HERE

type TestUnwrap1 = UnwrapPromise<Promise<string>>;   // string
type TestUnwrap2 = UnwrapPromise<Promise<number[]>>; // number[]
type TestUnwrap3 = UnwrapPromise<boolean>;           // boolean

// 1d. Nullable<T> — make all properties nullable (T[K] | null)
type Nullable<T> = // YOUR CODE HERE

type User = { name: string; age: number };
type NullableUser = Nullable<User>; // { name: string | null; age: number | null }

// 1e. Mutable<T> — remove readonly from all properties
type Mutable<T> = // YOUR CODE HERE

type FrozenPoint = { readonly x: number; readonly y: number };
type MutablePoint = Mutable<FrozenPoint>; // { x: number; y: number }

// 1f. Build a Getters<T> mapped type that creates getter method signatures
// For { name: string; age: number } produce:
// { getName: () => string; getAge: () => number }
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K]
};

type UserGetters = Getters<User>;
// Should have: getName: () => string, getAge: () => number

// Verify types compile (no runtime needed)
const testGetters: UserGetters = {
  getName: () => "Alice",
  getAge: () => 30,
};
console.log(testGetters.getName(), testGetters.getAge()); // Alice 30
