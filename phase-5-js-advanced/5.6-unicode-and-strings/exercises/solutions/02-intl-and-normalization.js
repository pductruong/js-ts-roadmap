function formatNumber(num, locale, options = {}) {
  return new Intl.NumberFormat(locale, options).format(num);
}

function formatCurrency(amount, currency, locale = "en-US") {
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(amount);
}

function localSort(arr, locale) {
  return [...arr].sort(new Intl.Collator(locale).compare);
}

function unicodeEqual(a, b) {
  return a.normalize("NFC") === b.normalize("NFC");
}

function extractWords(text, locale = "en") {
  const segmenter = new Intl.Segmenter(locale, { granularity: "word" });
  return [...segmenter.segment(text)].filter(s => s.isWordLike).map(s => s.segment);
}

function demonstrateNormalization() {
  const precomposed = "é";
  const decomposed  = "e\u0301";
  console.log("Precomposed length:", precomposed.length);
  console.log("Decomposed length:",  decomposed.length);
  console.log("Are they equal?",     precomposed === decomposed);
  console.log("After NFC equal?",    precomposed.normalize("NFC") === decomposed.normalize("NFC"));
}

console.log(formatNumber(1234567.89, "de-DE"));
console.log(formatNumber(1234567.89, "en-US"));
console.log(formatNumber(0.42, "en-US", { style: "percent" }));
console.log(formatCurrency(9.99, "USD"));
console.log(formatCurrency(9.99, "EUR", "de-DE"));
const german = ["Österreich", "Apfel", "Zug", "Übung"];
console.log(localSort(german, "de"));
console.log(german.sort());
console.log(unicodeEqual("café", "cafe\u0301"));
console.log(unicodeEqual("café", "cafE"));
console.log(extractWords("Hello, world! How are you?"));
demonstrateNormalization();
