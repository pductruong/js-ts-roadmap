type RequestState = "draft" | "sent" | "approved" | "rejected";
type Request<S extends RequestState> = { id: number; content: string; readonly _state?: S; };

function createRequest(id: number, content: string): Request<"draft"> { return { id, content }; }
function sendRequest(req: Request<"draft">): Request<"sent"> {
  console.log(`Sending request #${req.id}`); return req as unknown as Request<"sent">;
}
function approveRequest(req: Request<"sent">): Request<"approved"> {
  return req as unknown as Request<"approved">;
}
function rejectRequest(req: Request<"sent">): Request<"rejected"> {
  return req as unknown as Request<"rejected">;
}
function processApproved(req: Request<"approved">): void {
  console.log(`Processing approved request #${req.id}`);
}

declare const _brand: unique symbol;
type HasName = { readonly [_brand]: "HasName" };
type HasAge  = { readonly [_brand]: "HasAge" };
type Builder<Flags> = { _flags?: Flags; name?: string; age?: number; };
function withName<F>(b: Builder<F>, name: string): Builder<F & HasName> { return { ...b, name } as Builder<F & HasName>; }
function withAge<F>(b: Builder<F>, age: number): Builder<F & HasAge>   { return { ...b, age  } as Builder<F & HasAge>; }
function build(b: Builder<HasName & HasAge>): { name: string; age: number } { return { name: b.name!, age: b.age! }; }

const draft = createRequest(1, "Leave request");
processApproved(approveRequest(sendRequest(draft)));
const rejected = rejectRequest(sendRequest(createRequest(2, "Another")));
console.log(`Rejected #${rejected.id}`);
console.log(build(withAge(withName({}, "Alice"), 30)));
