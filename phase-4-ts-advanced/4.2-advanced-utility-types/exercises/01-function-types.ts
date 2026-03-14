// Exercise 1: Function & Class Utility Types
// -------------------------------------------

// 1a. Given these functions and class, derive their types using utility types

function createUser(name: string, age: number, email: string) {
  return { id: Math.random(), name, age, email };
}

async function fetchPosts(userId: number, limit: number) {
  return [{ id: 1, title: "Post 1", userId }];
}

class EventEmitter {
  constructor(private name: string, private maxListeners: number = 10) {}
  emit(event: string): void { console.log(`${this.name}: ${event}`); }
}

// Derive these types WITHOUT writing the types manually:
type CreateUserParams = // YOUR CODE HERE: use Parameters<>
type CreateUserReturn = // YOUR CODE HERE: use ReturnType<>
type FetchPostsReturn = // YOUR CODE HERE: use Awaited<ReturnType<>>
type EmitterCtor = // YOUR CODE HERE: use ConstructorParameters<>
type EmitterInstance = // YOUR CODE HERE: use InstanceType<>

// 1b. Write a generic wrapper that logs before calling a function
// It should preserve the original function's type signature
function withLogging<T extends (...args: any[]) => any>(fn: T, label: string): T {
  return ((...args: Parameters<T>): ReturnType<T> => {
    console.log(`[${label}] called with:`, args);
    return fn(...args);
  }) as T;
}

// 1c. Write a retry() wrapper — retries an async function up to n times on failure
async function retry<T>(fn: () => Promise<T>, times: number): Promise<T> {
  // YOUR CODE HERE
}

// Tests
const loggedCreate = withLogging(createUser, "createUser");
loggedCreate("Alice", 30, "alice@test.com");

// Test retry
let attempt = 0;
retry(async () => {
  attempt++;
  if (attempt < 3) throw new Error("Not yet");
  return "success";
}, 5).then(result => console.log("Retry result:", result, "after", attempt, "attempts"));
