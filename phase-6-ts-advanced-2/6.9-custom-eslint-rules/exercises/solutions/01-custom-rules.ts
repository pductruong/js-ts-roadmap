function isConsoleLog(node: {
  type: string;
  callee?: { type: string; object?: { type: string; name?: string }; property?: { type: string; name?: string } };
}): boolean {
  return (
    node.type === "CallExpression" &&
    node.callee?.type === "MemberExpression" &&
    node.callee?.object?.name === "console" &&
    node.callee?.property?.name === "log"
  );
}

function isAnyType(node: { type: string }): boolean {
  return node.type === "TSAnyKeyword";
}

function shouldBeConst(declaration: {
  kind: "let" | "const" | "var";
  declarations: Array<{ init: unknown; isReassigned: boolean }>;
}): boolean {
  return (
    declaration.kind === "let" &&
    declaration.declarations.every(d => d.init !== null && d.init !== undefined && !d.isReassigned)
  );
}

function isFloatingPromise(node: {
  type: string;
  parent?: { type: string };
  returnsPromise: boolean;
}): boolean {
  return (
    node.type === "CallExpression" &&
    node.returnsPromise === true &&
    node.parent?.type === "ExpressionStatement"
  );
}

const ruleExplanations: Record<string, string> = {
  "no-floating-promises":       "Ensures Promise-returning calls are awaited, returned, or voided — prevents silent async errors",
  "require-await":              "Flags async functions that have no await expression inside — they don't need to be async",
  "no-misused-promises":        "Prevents Promises from being passed where booleans are expected (if conditions, && chains)",
  "strict-boolean-expressions": "Disallows implicit boolean coercion of non-boolean types — requires explicit comparisons",
  "no-explicit-any":            "Disallows use of the any type — forces proper typing",
};

console.log(isConsoleLog({ type: "CallExpression", callee: { type: "MemberExpression", object: { type: "Identifier", name: "console" }, property: { type: "Identifier", name: "log" } } }));
console.log(isConsoleLog({ type: "CallExpression", callee: { type: "MemberExpression", object: { type: "Identifier", name: "Math" }, property: { type: "Identifier", name: "random" } } }));
console.log(isAnyType({ type: "TSAnyKeyword" }));
console.log(isAnyType({ type: "TSStringKeyword" }));
console.log(shouldBeConst({ kind: "let",   declarations: [{ init: 42,   isReassigned: false }] }));
console.log(shouldBeConst({ kind: "let",   declarations: [{ init: 42,   isReassigned: true  }] }));
console.log(shouldBeConst({ kind: "const", declarations: [{ init: 42,   isReassigned: false }] }));
console.log(shouldBeConst({ kind: "let",   declarations: [{ init: null, isReassigned: false }] }));
console.log(isFloatingPromise({ type: "CallExpression", parent: { type: "ExpressionStatement" }, returnsPromise: true  }));
console.log(isFloatingPromise({ type: "CallExpression", parent: { type: "AwaitExpression"     }, returnsPromise: true  }));
console.log(isFloatingPromise({ type: "CallExpression", parent: { type: "ExpressionStatement" }, returnsPromise: false }));
console.log(ruleExplanations);
