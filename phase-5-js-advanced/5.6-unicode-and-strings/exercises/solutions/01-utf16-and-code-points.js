function codePointLength(str) {
  return [...str].length;
}

function codePointAt(str, index) {
  return [...str][index];
}

function reverseString(str) {
  return [...str].reverse().join("");
}

function containsEmoji(str) {
  for (const char of str) {
    if (char.codePointAt(0) > 0xFFFF) return true;
  }
  return false;
}

function toGraphemes(str, locale = "en") {
  const segmenter = new Intl.Segmenter(locale, { granularity: "grapheme" });
  return [...segmenter.segment(str)].map(s => s.segment);
}

console.log("😀".length);
console.log(codePointLength("😀hello"));
console.log(codePointLength("👨‍👩‍👧‍👦"));
console.log(codePointAt("😀hello", 0));
console.log(codePointAt("😀hello", 1));
console.log(reverseString("hello"));
console.log(reverseString("hello😀"));
console.log(containsEmoji("hello😀world"));
console.log(containsEmoji("hello world"));
const graphemes = toGraphemes("👨‍👩‍👧‍👦café");
console.log(graphemes.length);
console.log(graphemes[0]);
