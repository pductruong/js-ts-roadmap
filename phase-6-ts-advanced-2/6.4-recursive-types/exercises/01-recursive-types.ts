// Exercise 1: Recursive Types
// ----------------------------

// 1a. Define the JSONValue type (JSON-serializable values)
type JSONValue =
  // YOUR CODE HERE: string | number | boolean | null | array | object
  ;

// 1b. Deep Readonly — applies Readonly to all nested levels
type DeepReadonly<T> =
  T extends (infer E)[]
    ? ReadonlyArray<DeepReadonly<E>>
    : T extends object
    ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
    : T;

// 1c. Deep Partial — make every nested property optional
type DeepPartial<T> =
  // YOUR CODE HERE (similar to DeepReadonly but with ?)
  ;

// 1d. Tree node structure
type TreeNode<T> = {
  value: T;
  children: TreeNode<T>[];
};

// Write a function to calculate the depth of a tree
function treeDepth<T>(node: TreeNode<T>): number {
  // YOUR CODE HERE: 1 + max depth of children (0 if no children)
}

// Write a function to collect all values in a tree (depth-first)
function treeValues<T>(node: TreeNode<T>): T[] {
  // YOUR CODE HERE
}

// 1e. Recursive Awaited — unwrap nested promises
type DeepAwaited<T> = T extends Promise<infer V> ? DeepAwaited<V> : T;

// Verify the types:
type A1 = DeepAwaited<Promise<string>>;                    // string
type A2 = DeepAwaited<Promise<Promise<number>>>;           // number
type A3 = DeepAwaited<Promise<Promise<Promise<boolean>>>>; // boolean

// Tests

// JSON
const validJSON: JSONValue = { name: "Alice", scores: [1, 2, 3], active: true, address: null };
console.log(JSON.stringify(validJSON));

// DeepReadonly
type Config = { db: { host: string; port: number }; debug: boolean };
type FrozenConfig = DeepReadonly<Config>;
const config: FrozenConfig = { db: { host: "localhost", port: 5432 }, debug: false };
// config.db.port = 9999; // TypeScript Error

// DeepPartial
type DeepPartialConfig = DeepPartial<Config>;
const partial: DeepPartialConfig = { db: { host: "localhost" } }; // no port, no debug
console.log(partial);

// Tree
const tree: TreeNode<number> = {
  value: 1,
  children: [
    { value: 2, children: [{ value: 4, children: [] }, { value: 5, children: [] }] },
    { value: 3, children: [{ value: 6, children: [] }] },
  ],
};
console.log(treeDepth(tree));    // 3
console.log(treeValues(tree));   // [1, 2, 4, 5, 3, 6]
