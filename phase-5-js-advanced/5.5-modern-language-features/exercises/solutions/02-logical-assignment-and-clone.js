function normalizeConfig(config) {
  config.timeout ??= 3000;
  config.retries ||= 3;
  config.name &&= config.name.trim();
  return config;
}

function cloneComplex(original) {
  return structuredClone(original);
}

function testCloneLimits() {
  try {
    structuredClone({ fn: () => {} });
  } catch (err) {
    console.log("Cannot clone functions:", err.message);
  }
}

function parseISODate(str) {
  const match = str.match(/(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/);
  if (!match) return null;
  const { year, month, day } = match.groups;
  return { year: Number(year), month: Number(month), day: Number(day) };
}

function extractPrices(text) {
  return [...text.matchAll(/\$[\d,]+(?:\.\d{2})?/g)].map(m => m[0]);
}

const cfg = { timeout: null, retries: 0, name: "  my-service  " };
console.log(normalizeConfig(cfg));

const original = {
  date: new Date("2024-01-01"),
  tags: new Set(["a", "b"]),
  scores: new Map([["Alice", 100]]),
  nested: { values: [1, 2, 3] },
};
const clone = cloneComplex(original);
clone.nested.values.push(99);
console.log(original.nested.values);

testCloneLimits();
console.log(parseISODate("2024-03-15"));
const text = "Laptop $999.99 and Mouse $29.99 and Cable $5";
console.log(extractPrices(text));
