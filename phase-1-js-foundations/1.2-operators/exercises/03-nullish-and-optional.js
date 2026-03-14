// Exercise 3: Nullish Coalescing & Optional Chaining
// ---------------------------------------------------

// 3a. Return displayName if truthy, otherwise return "Anonymous"
// Use ?? — NOT ||
function getDisplayName(displayName) {
  // YOUR CODE HERE
}

// 3b. Safely get the user's city. Return "Unknown" if any part is missing.
function getUserCity(user) {
  // user may be null, or user.address may be missing, or user.address.city
  // YOUR CODE HERE
}

// 3c. Call user.greet() safely. If it doesn't exist, return "No greeting".
function tryGreet(user) {
  // YOUR CODE HERE
}

// 3d. What is the difference between ?? and || ?
// Complete the table by predicting the output:
const tests = [
  { val: null,      label: "null" },
  { val: undefined, label: "undefined" },
  { val: 0,         label: "0" },
  { val: "",        label: '""' },
  { val: false,     label: "false" },
];

tests.forEach(({ val, label }) => {
  console.log(`${label.padEnd(12)} ?? "default" =>`, val ?? "default");
  console.log(`${label.padEnd(12)} || "default" =>`, val || "default");
  console.log("---");
});

// Tests
console.log(getDisplayName("Alice"));    // "Alice"
console.log(getDisplayName(""));         // "" (empty string is NOT null/undefined!)
console.log(getDisplayName(null));       // "Anonymous"
console.log(getDisplayName(undefined));  // "Anonymous"

console.log(getUserCity({ address: { city: "Hanoi" } })); // "Hanoi"
console.log(getUserCity({ address: {} }));                 // "Unknown"
console.log(getUserCity(null));                            // "Unknown"

console.log(tryGreet({ greet: () => "Hello!" })); // "Hello!"
console.log(tryGreet({}));                         // "No greeting"
