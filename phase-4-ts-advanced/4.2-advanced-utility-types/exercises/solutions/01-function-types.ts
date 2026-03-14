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

type CreateUserParams = Parameters<typeof createUser>;
type CreateUserReturn = ReturnType<typeof createUser>;
type FetchPostsReturn = Awaited<ReturnType<typeof fetchPosts>>;
type EmitterCtor = ConstructorParameters<typeof EventEmitter>;
type EmitterInstance = InstanceType<typeof EventEmitter>;

function withLogging<T extends (...args: any[]) => any>(fn: T, label: string): T {
  return ((...args: Parameters<T>): ReturnType<T> => {
    console.log(`[${label}] called with:`, args);
    return fn(...args);
  }) as T;
}

async function retry<T>(fn: () => Promise<T>, times: number): Promise<T> {
  let lastError: unknown;
  for (let i = 0; i < times; i++) {
    try { return await fn(); }
    catch (err) { lastError = err; }
  }
  throw lastError;
}

const loggedCreate = withLogging(createUser, "createUser");
loggedCreate("Alice", 30, "alice@test.com");

let attempt = 0;
retry(async () => {
  attempt++;
  if (attempt < 3) throw new Error("Not yet");
  return "success";
}, 5).then(result => console.log("Retry result:", result, "after", attempt, "attempts"));
