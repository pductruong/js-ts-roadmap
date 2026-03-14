// Exercise 1: UTF-16 & Code Points
// ----------------------------------

// 1a. Write a function that returns the CORRECT length of a string
// (counting code points, not code units)
function codePointLength(str) {
  // YOUR CODE HERE: use spread or for...of
}

// 1b. Write a function that safely gets the character at a given code-point index
function codePointAt(str, index) {
  // YOUR CODE HERE: spread to array, then index
}

// 1c. Write a function that reverses a string correctly (handling surrogate pairs)
function reverseString(str) {
  // YOUR CODE HERE: spread to array, reverse, join
}

// 1d. Write a function that checks whether a string contains any emoji
// (characters outside the BMP, i.e. code point > 0xFFFF)
function containsEmoji(str) {
  // YOUR CODE HERE: use for...of and codePointAt(0)
}

// 1e. Write a function that splits a string into grapheme clusters using Intl.Segmenter
function toGraphemes(str, locale = "en") {
  // YOUR CODE HERE
}

// Tests
console.log("😀".length);                    // 2 (UTF-16 code units)
console.log(codePointLength("😀hello"));     // 6 (correct: 1 emoji + 5 letters)
console.log(codePointLength("👨‍👩‍👧‍👦"));        // 1 (family emoji = 1 grapheme cluster... but many code points!)

console.log(codePointAt("😀hello", 0));      // "😀"
console.log(codePointAt("😀hello", 1));      // "h"

console.log(reverseString("hello"));          // "olleh"
console.log(reverseString("hello😀"));        // "😀olleh" (emoji stays intact)

console.log(containsEmoji("hello😀world"));  // true
console.log(containsEmoji("hello world"));   // false

const graphemes = toGraphemes("👨‍👩‍👧‍👦café");
console.log(graphemes.length);  // 6 (1 family + 4 café letters)
console.log(graphemes[0]);      // "👨‍👩‍👧‍👦"
