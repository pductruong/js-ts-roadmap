# 5.6 Unicode & Strings

## Why this matters
JavaScript strings are UTF-16 encoded. Most developers treat strings as arrays of characters — but this breaks for any character outside the Basic Multilingual Plane (emoji, many Asian scripts, mathematical symbols).

## UTF-16 & Code Points

```js
// Code unit vs code point
"A".length        // 1 — BMP character, one UTF-16 code unit
"😀".length       // 2 — outside BMP, uses a surrogate pair (two code units)
"𠮷".length       // 2 — CJK extension character

// Code point (the actual Unicode value)
"😀".codePointAt(0)  // 128512 (0x1F600)
"A".charCodeAt(0)    // 65 (works for BMP only)

// Iterate by code point, not code unit
for (const char of "😀hello") {
  console.log(char); // 😀, h, e, l, l, o — correct!
}
[..."😀hello"]       // ["😀", "h", "e", "l", "l", "o"]

// String.fromCodePoint vs fromCharCode
String.fromCodePoint(128512) // "😀"
String.fromCharCode(128512)  // broken — silently truncates
```

## Surrogate Pairs
Characters above U+FFFF are represented as two UTF-16 code units (a surrogate pair):
- High surrogate: U+D800–U+DBFF
- Low surrogate: U+DC00–U+DFFF

```js
"😀".charCodeAt(0).toString(16)  // "d83d"  — high surrogate
"😀".charCodeAt(1).toString(16)  // "de00"  — low surrogate

// Detect surrogates
function isSurrogatePair(str, index) {
  const code = str.charCodeAt(index);
  return code >= 0xD800 && code <= 0xDBFF;
}
```

## Grapheme Clusters
A single visible character can be multiple code points combined:

```js
"é".length   // could be 1 (precomposed U+00E9) or 2 (e + combining accent U+0301)
"é" === "é"  // false if one is precomposed and one is decomposed!

// Normalize first
"é".normalize("NFC") === "é".normalize("NFC") // true

// Grapheme clusters (visible characters)
const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
[...segmenter.segment("👨‍👩‍👧‍👦")].length  // 1 visible character
"👨‍👩‍👧‍👦".length                          // 11 code units!
```

## Unicode Property Escapes in Regex
```js
// \p{} matches Unicode properties — requires `u` flag
/\p{Letter}/u.test("A")   // true
/\p{Letter}/u.test("1")   // false
/\p{Emoji}/u.test("😀")   // true
/\p{Script=Greek}/u.test("α") // true

// \p{L} — any letter in any language
/^\p{L}+$/u.test("Héllo")  // true
/^\p{L}+$/u.test("hello1") // false
```

## Intl API
```js
// Locale-aware formatting
new Intl.NumberFormat("de-DE").format(1234567.89)  // "1.234.567,89"
new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(9.99) // "$9.99"

new Intl.DateTimeFormat("vi-VN").format(new Date()) // Vietnamese date format

// Locale-aware sorting (collation)
["ä", "z", "a"].sort(new Intl.Collator("de").compare) // ["a", "ä", "z"]
["ä", "z", "a"].sort() // ["a", "z", "ä"] — wrong for German!

// Segmenter — split by grapheme, word, or sentence
const wordSeg = new Intl.Segmenter("en", { granularity: "word" });
[...wordSeg.segment("Hello, world!")].filter(s => s.isWordLike).map(s => s.segment)
// ["Hello", "world"]
```

## String Normalization
```js
// NFC — canonical composed (most common, web standard)
// NFD — canonical decomposed
// NFKC/NFKD — compatibility forms (e.g. ﬁ ligature → fi)

"café".normalize("NFC").length  // 4
"café".normalize("NFD").length  // 5 (e + combining accent)
```

## Resources
- [javascript.info: Strings](https://javascript.info/string)
- [MDN: String.prototype.codePointAt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt)
- [MDN: Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)
- [Unicode explained](https://www.joelonsoftware.com/2003/10/08/the-absolute-minimum-every-software-developer-absolutely-positively-must-know-about-unicode-and-character-sets-no-excuses/)

## Exercises
Go to the [exercises](./exercises/) folder.
