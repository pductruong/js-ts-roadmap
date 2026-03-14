// Exercise 1: Custom ESLint Rule Logic
// --------------------------------------
// These exercises teach the logic you put inside ESLint rule create() functions.
// No ESLint plugin setup required — we simulate the AST node shapes.

// 1a. Detect console.log calls
function isConsoleLog(node: {
  type: string;
  callee?: {
    type: string;
    object?: { type: string; name?: string };
    property?: { type: string; name?: string };
  };
}): boolean {
  // YOUR CODE HERE
}

// 1b. Detect `any` type annotation
function isAnyType(node: { type: string }): boolean {
  // YOUR CODE HERE: check node.type === "TSAnyKeyword"
}

// 1c. Detect `let` that could be `const`
function shouldBeConst(declaration: {
  kind: "let" | "const" | "var";
  declarations: Array<{ init: unknown; isReassigned: boolean }>;
}): boolean {
  // YOUR CODE HERE:
  // kind === "let" AND has initializer AND never reassigned
}

// 1d. Detect floating promise (awaitable call not awaited)
// A "floating promise" is a CallExpression whose result is a Promise that is not awaited,
// not returned, and not assigned.
function isFloatingPromise(node: {
  type: string;
  parent?: { type: string };
  returnsPromise: boolean; // pretend we got this from the type checker
}): boolean {
  // YOUR CODE HERE:
  // - node.type === "CallExpression"
  // - node.returnsPromise is true
  // - parent is ExpressionStatement (meaning: result is discarded)
}

// 1e. Describe what each typescript-eslint rule does:
const ruleExplanations: Record<string, string> = {
  "no-floating-promises":       "YOUR ANSWER",
  "require-await":              "YOUR ANSWER",
  "no-misused-promises":        "YOUR ANSWER",
  "strict-boolean-expressions": "YOUR ANSWER",
  "no-explicit-any":            "YOUR ANSWER",
};

// Tests
console.log(isConsoleLog({
  type: "CallExpression",
  callee: { type: "MemberExpression", object: { type: "Identifier", name: "console" }, property: { type: "Identifier", name: "log" } },
})); // true

console.log(isConsoleLog({
  type: "CallExpression",
  callee: { type: "MemberExpression", object: { type: "Identifier", name: "Math" }, property: { type: "Identifier", name: "random" } },
})); // false

console.log(isAnyType({ type: "TSAnyKeyword" }));    // true
console.log(isAnyType({ type: "TSStringKeyword" })); // false

console.log(shouldBeConst({ kind: "let",   declarations: [{ init: 42, isReassigned: false }] })); // true
console.log(shouldBeConst({ kind: "let",   declarations: [{ init: 42, isReassigned: true  }] })); // false
console.log(shouldBeConst({ kind: "const", declarations: [{ init: 42, isReassigned: false }] })); // false
console.log(shouldBeConst({ kind: "let",   declarations: [{ init: null, isReassigned: false }] })); // false

console.log(isFloatingPromise({ type: "CallExpression", parent: { type: "ExpressionStatement" }, returnsPromise: true  })); // true
console.log(isFloatingPromise({ type: "CallExpression", parent: { type: "AwaitExpression"     }, returnsPromise: true  })); // false
console.log(isFloatingPromise({ type: "CallExpression", parent: { type: "ExpressionStatement" }, returnsPromise: false })); // false
