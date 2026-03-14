// Exercise 2: Logical Assignment & structuredClone
// -------------------------------------------------

// 2a. Rewrite using logical assignment operators (&&=, ||=, ??=)

// Verbose version — rewrite each as a one-liner assignment
function normalizeConfig(config) {
  // Rewrite using ??=
  if (config.timeout === null || config.timeout === undefined) {
    config.timeout = 3000;
  }

  // Rewrite using ||=
  if (!config.retries) {
    config.retries = 3;
  }

  // Rewrite using &&=
  if (config.name) {
    config.name = config.name.trim();
  }

  return config;
}

// 2b. structuredClone — deep clone with complex types
function cloneComplex(original) {
  // Clone an object containing: Date, Map, Set, nested arrays
  // YOUR CODE HERE: use structuredClone
}

// 2c. Show what structuredClone cannot clone
function testCloneLimits() {
  // Try to clone an object with a function property
  // YOUR CODE HERE: wrap in try/catch and log the error
}

// 2d. Advanced regex — extract data using named groups
function parseISODate(str) {
  // Parse "2024-03-15" into { year, month, day } as numbers
  // YOUR CODE HERE: use named capture groups
}

function extractPrices(text) {
  // Extract all prices like "$19.99", "$5", "$1,234.56" from a string
  // Return array of strings
  // YOUR CODE HERE: use matchAll with a regex
}

// Tests
const cfg = { timeout: null, retries: 0, name: "  my-service  " };
console.log(normalizeConfig(cfg));
// { timeout: 3000, retries: 3, name: "my-service" }

const original = {
  date: new Date("2024-01-01"),
  tags: new Set(["a", "b"]),
  scores: new Map([["Alice", 100]]),
  nested: { values: [1, 2, 3] },
};
const clone = cloneComplex(original);
clone.nested.values.push(99);
console.log(original.nested.values); // [1, 2, 3] — not mutated

testCloneLimits();

console.log(parseISODate("2024-03-15")); // { year: 2024, month: 3, day: 15 }

const text = "Laptop $999.99 and Mouse $29.99 and Cable $5";
console.log(extractPrices(text)); // ["$999.99", "$29.99", "$5"]
