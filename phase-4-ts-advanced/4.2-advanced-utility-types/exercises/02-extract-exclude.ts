// Exercise 2: Extract, Exclude, NonNullable & Combining
// -------------------------------------------------------

type Status = "pending" | "active" | "inactive" | "deleted" | "archived";

// 2a. Extract only the "live" statuses: active and pending
type LiveStatus = // YOUR CODE HERE: Extract<>

// 2b. Exclude all terminal statuses: deleted and archived
type OngoingStatus = // YOUR CODE HERE: Exclude<>

// 2c. Remove null and undefined
type MaybeString = string | null | undefined;
type DefiniteString = // YOUR CODE HERE: NonNullable<>

// 2d. Given an ApiResponse type, write a utility to extract the data type
type ApiResponse<T> = { data: T; error: string | null; status: number };
type DataOf<T> = // YOUR CODE HERE (use conditional type + infer)

type UserResponse = ApiResponse<{ id: number; name: string }>;
type PostsResponse = ApiResponse<{ id: number; title: string }[]>;

type UserData = DataOf<UserResponse>;  // { id: number; name: string }
type PostsData = DataOf<PostsResponse>; // { id: number; title: string }[]

// 2e. Write a safeGet function typed with NonNullable
function safeGet<T>(value: T | null | undefined, fallback: NonNullable<T>): NonNullable<T> {
  // YOUR CODE HERE
}

// 2f. Filter a union to only string members
type Mixed = string | number | boolean | null;
type OnlyStrings = // YOUR CODE HERE: Extract<> only string

// Tests
const live: LiveStatus = "active";  // OK
// const bad: LiveStatus = "deleted"; // Error

console.log(safeGet(null, "default"));      // "default"
console.log(safeGet(undefined, 42));        // 42
console.log(safeGet("hello", "fallback")); // "hello"
