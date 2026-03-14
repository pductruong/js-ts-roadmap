type JSONValue =
  | string | number | boolean | null
  | JSONValue[]
  | { [key: string]: JSONValue };

type DeepReadonly<T> =
  T extends (infer E)[]
    ? ReadonlyArray<DeepReadonly<E>>
    : T extends object
    ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
    : T;

type DeepPartial<T> =
  T extends object
    ? { [K in keyof T]?: DeepPartial<T[K]> }
    : T;

type TreeNode<T> = { value: T; children: TreeNode<T>[] };

function treeDepth<T>(node: TreeNode<T>): number {
  if (node.children.length === 0) return 1;
  return 1 + Math.max(...node.children.map(treeDepth));
}

function treeValues<T>(node: TreeNode<T>): T[] {
  return [node.value, ...node.children.flatMap(treeValues)];
}

type DeepAwaited<T> = T extends Promise<infer V> ? DeepAwaited<V> : T;

const validJSON: JSONValue = { name: "Alice", scores: [1, 2, 3], active: true, address: null };
console.log(JSON.stringify(validJSON));

type Config = { db: { host: string; port: number }; debug: boolean };
const config: DeepReadonly<Config> = { db: { host: "localhost", port: 5432 }, debug: false };

const partial: DeepPartial<Config> = { db: { host: "localhost" } };
console.log(partial);

const tree: TreeNode<number> = {
  value: 1,
  children: [
    { value: 2, children: [{ value: 4, children: [] }, { value: 5, children: [] }] },
    { value: 3, children: [{ value: 6, children: [] }] },
  ],
};
console.log(treeDepth(tree));
console.log(treeValues(tree));
