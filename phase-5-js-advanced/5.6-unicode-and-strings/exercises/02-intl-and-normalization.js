// Exercise 2: Intl API & String Normalization
// ---------------------------------------------

// 2a. Format a number in different locales
function formatNumber(num, locale, options = {}) {
  // YOUR CODE HERE: use Intl.NumberFormat
}

// 2b. Format a currency amount
function formatCurrency(amount, currency, locale = "en-US") {
  // YOUR CODE HERE
}

// 2c. Sort an array of strings correctly for a given locale
function localSort(arr, locale) {
  // YOUR CODE HERE: use Intl.Collator
}

// 2d. Normalize and compare two strings that may differ in composition
function unicodeEqual(a, b) {
  // YOUR CODE HERE: normalize both to NFC before comparing
}

// 2e. Split a string into words (skip punctuation and spaces)
function extractWords(text, locale = "en") {
  // YOUR CODE HERE: use Intl.Segmenter with granularity "word" and isWordLike filter
}

// 2f. Demonstrate the normalization problem
function demonstrateNormalization() {
  const precomposed  = "é";         // U+00E9
  const decomposed   = "e\u0301";   // U+0065 + U+0301

  console.log("Precomposed length:", precomposed.length);   // 1
  console.log("Decomposed length:",  decomposed.length);    // 2
  console.log("Are they equal?",     precomposed === decomposed);               // false!
  console.log("After NFC equal?",    precomposed.normalize("NFC") === decomposed.normalize("NFC")); // true
}

// Tests
console.log(formatNumber(1234567.89, "de-DE"));         // "1.234.567,89"
console.log(formatNumber(1234567.89, "en-US"));         // "1,234,567.89"
console.log(formatNumber(0.42, "en-US", { style: "percent" })); // "42%"

console.log(formatCurrency(9.99, "USD"));               // "$9.99"
console.log(formatCurrency(9.99, "EUR", "de-DE"));      // "9,99 €"

const german = ["Österreich", "Apfel", "Zug", "Übung"];
console.log(localSort(german, "de"));                   // correct German alphabetical order
console.log(german.sort());                             // wrong — ASCII sort

console.log(unicodeEqual("café", "cafe\u0301"));        // true
console.log(unicodeEqual("café", "cafE"));              // false

console.log(extractWords("Hello, world! How are you?"));
// ["Hello", "world", "How", "are", "you"]

demonstrateNormalization();
