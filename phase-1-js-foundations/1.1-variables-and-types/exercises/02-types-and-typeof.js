// Exercise 2: Types and typeof
// ----------------------------
// Fill in the expected typeof result for each value.
// Then run the file to verify your answers.

const values = [
  42,
  "hello",
  true,
  null,
  undefined,
  {},
  [],
  function () {},
  Symbol("x"),
  9007199254740991n,
];

const expectedTypes = [
  "number",    // fill in your answers here
  // YOUR CODE: replace the remaining empty strings with typeof results
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
];

values.forEach((val, i) => {
  const actual = typeof val;
  const expected = expectedTypes[i];
  const status = actual === expected ? "PASS" : `FAIL (expected "${expected}", got "${actual}")`;
  console.log(`typeof ${String(val).slice(0, 20).padEnd(20)} => ${actual.padEnd(12)} ${status}`);
});
