type Head<T extends readonly unknown[]> = T extends [infer H, ...unknown[]] ? H : never;
type Tail<T extends readonly unknown[]> = T extends [unknown, ...infer T] ? T : never;
type Last<T extends readonly unknown[]> =
  T extends [...unknown[], infer L] ? L : never;
type Length<T extends readonly unknown[]> = T["length"];

type Split<S extends string, Sep extends string> =
  S extends `${infer Head}${Sep}${infer Tail}`
    ? [Head, ...Split<Tail, Sep>]
    : [S];

type Join<T extends string[], Sep extends string> =
  T extends [infer Only extends string]
    ? Only
    : T extends [infer First extends string, ...infer Rest extends string[]]
    ? `${First}${Sep}${Join<Rest, Sep>}`
    : "";

type Reverse<T extends readonly unknown[]> =
  T extends [infer Head, ...infer Tail]
    ? [...Reverse<Tail>, Head]
    : [];

type Flatten<T extends readonly unknown[]> =
  T extends [infer Head, ...infer Tail]
    ? Head extends readonly unknown[]
      ? [...Head, ...Flatten<Tail>]
      : [Head, ...Flatten<Tail>]
    : [];

function splitStr<S extends string, Sep extends string>(str: S, sep: Sep): Split<S, Sep> {
  return str.split(sep) as Split<S, Sep>;
}
const parts = splitStr("hello,world,foo", ",");
console.log(parts);
