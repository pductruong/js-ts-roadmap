type Status = "pending" | "active" | "inactive" | "deleted" | "archived";

type LiveStatus = Extract<Status, "active" | "pending">;
type OngoingStatus = Exclude<Status, "deleted" | "archived">;
type MaybeString = string | null | undefined;
type DefiniteString = NonNullable<MaybeString>;

type ApiResponse<T> = { data: T; error: string | null; status: number };
type DataOf<T> = T extends ApiResponse<infer D> ? D : never;

type UserResponse = ApiResponse<{ id: number; name: string }>;
type PostsResponse = ApiResponse<{ id: number; title: string }[]>;
type UserData = DataOf<UserResponse>;
type PostsData = DataOf<PostsResponse>;

function safeGet<T>(value: T | null | undefined, fallback: NonNullable<T>): NonNullable<T> {
  return (value ?? fallback) as NonNullable<T>;
}

type Mixed = string | number | boolean | null;
type OnlyStrings = Extract<Mixed, string>;

const live: LiveStatus = "active";
console.log(live);
console.log(safeGet(null, "default"));
console.log(safeGet(undefined, 42));
console.log(safeGet("hello", "fallback"));
