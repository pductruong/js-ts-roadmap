// Exercise 1: Type-level Algorithms
// -----------------------------------

// 1a. Tuple operations
type Head<T extends readonly unknown[]> =
  T extends [infer H, ...unknown[]] ? H : never;

type Tail<T extends readonly unknown[]> =
  T extends [unknown, ...infer T] ? T : never;

type Last<T extends readonly unknown[]> =
  // YOUR CODE HERE: return the last element type
  ;

type Length<T extends readonly unknown[]> = T["length"];

// 1b. String Split type
type Split<S extends string, Sep extends string> =
  S extends `${infer Head}${Sep}${infer Tail}`
    ? [Head, ...Split<Tail, Sep>]
    : [S];

// 1c. String Join type (reverse of Split)
type Join<T extends string[], Sep extends string> =
  // YOUR CODE HERE: join string tuple with separator
  // Hint: use recursive conditional types
  ;

// 1d. Reverse a tuple type
type Reverse<T extends readonly unknown[]> =
  // YOUR CODE HERE
  ;

// 1e. Flatten one level of a tuple
type Flatten<T extends readonly unknown[]> =
  T extends [infer Head, ...infer Tail]
    ? Head extends readonly unknown[]
      ? [...Head, ...Flatten<Tail>]
      : [Head, ...Flatten<Tail>]
    : [];

// Verify with type assertions (compile-time checks)
type _h = Head<[1, 2, 3]>;          // 1
type _t = Tail<[1, 2, 3]>;          // [2, 3]
type _l = Last<[1, 2, 3]>;          // 3
type _len = Length<[1, 2, 3, 4]>;   // 4

type _split = Split<"a,b,c", ",">;  // ["a", "b", "c"]
type _join  = Join<["a", "b", "c"], ",">; // "a,b,c"
type _rev   = Reverse<[1, 2, 3]>;   // [3, 2, 1]
type _flat  = Flatten<[[1, 2], [3, 4], [5]]>; // [1, 2, 3, 4, 5]

// Runtime verification using the types
function splitStr<S extends string, Sep extends string>(
  str: S, sep: Sep
): Split<S, Sep> {
  return str.split(sep) as Split<S, Sep>;
}

const parts = splitStr("hello,world,foo", ",");
console.log(parts); // ["hello", "world", "foo"]
