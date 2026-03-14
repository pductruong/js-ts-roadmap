// Exercise 2: Phantom Types — State Machine in the Type System
// ------------------------------------------------------------

type RequestState = "draft" | "sent" | "approved" | "rejected";

type Request<S extends RequestState> = {
  id: number;
  content: string;
  readonly _state?: S; // phantom — not stored at runtime
};

function createRequest(id: number, content: string): Request<"draft"> {
  return { id, content };
}

function sendRequest(req: Request<"draft">): Request<"sent"> {
  console.log(`Sending request #${req.id}`);
  return req as unknown as Request<"sent">;
}

function approveRequest(req: Request<"sent">): Request<"approved"> {
  // YOUR CODE HERE
}

function rejectRequest(req: Request<"sent">): Request<"rejected"> {
  // YOUR CODE HERE
}

function processApproved(req: Request<"approved">): void {
  console.log(`Processing approved request #${req.id}`);
}

// 2b. Type-safe builder using phantom types
// Tracks which fields have been set at compile time
declare const _brand: unique symbol;
type HasName = { readonly [_brand]: "HasName" };
type HasAge  = { readonly [_brand]: "HasAge"  };

type Builder<Flags> = {
  _flags?: Flags;
  name?: string;
  age?: number;
};

function withName<F>(b: Builder<F>, name: string): Builder<F & HasName> {
  return { ...b, name } as Builder<F & HasName>;
}

function withAge<F>(b: Builder<F>, age: number): Builder<F & HasAge> {
  return { ...b, age } as Builder<F & HasAge>;
}

// build() only compiles when both name and age have been set
function build(b: Builder<HasName & HasAge>): { name: string; age: number } {
  return { name: b.name!, age: b.age! };
}

// Tests
const draft = createRequest(1, "Please approve my leave");
const sent  = sendRequest(draft);
const approved = approveRequest(sent);
processApproved(approved);
// processApproved(sent); // TypeScript Error

const rejected = rejectRequest(sendRequest(createRequest(2, "Another request")));
console.log(`Rejected request #${rejected.id}`);

const person = build(withAge(withName({}, "Alice"), 30));
console.log(person); // { name: "Alice", age: 30 }

// build(withName({}, "Bob")); // TypeScript Error: missing HasAge
