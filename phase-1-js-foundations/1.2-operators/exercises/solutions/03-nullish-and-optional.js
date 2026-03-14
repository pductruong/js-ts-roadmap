function getDisplayName(displayName) {
  return displayName ?? "Anonymous";
}

function getUserCity(user) {
  return user?.address?.city ?? "Unknown";
}

function tryGreet(user) {
  return user?.greet?.() ?? "No greeting";
}

const tests = [
  { val: null, label: "null" },
  { val: undefined, label: "undefined" },
  { val: 0, label: "0" },
  { val: "", label: '""' },
  { val: false, label: "false" },
];

tests.forEach(({ val, label }) => {
  console.log(`${label.padEnd(12)} ?? "default" =>`, val ?? "default");
  console.log(`${label.padEnd(12)} || "default" =>`, val || "default");
  console.log("---");
});

console.log(getDisplayName("Alice"));
console.log(getDisplayName(""));
console.log(getDisplayName(null));
console.log(getDisplayName(undefined));
console.log(getUserCity({ address: { city: "Hanoi" } }));
console.log(getUserCity({ address: {} }));
console.log(getUserCity(null));
console.log(tryGreet({ greet: () => "Hello!" }));
console.log(tryGreet({}));
