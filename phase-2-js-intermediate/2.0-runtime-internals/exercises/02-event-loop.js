// Exercise 2: Event Loop — Predict the Output
// --------------------------------------------
// For each block, write the expected output order as comments BEFORE running.
// Then run the file to verify: node 02-event-loop.js

// --- Block A ---
console.log("A1");
setTimeout(() => console.log("A2"), 0);
console.log("A3");
// Expected order: ?, ?, ?


// --- Block B ---
console.log("B1");
setTimeout(() => console.log("B2 - timeout 100"), 100);
setTimeout(() => console.log("B3 - timeout 0"), 0);
console.log("B4");
// Expected order: ?, ?, ?, ?


// --- Block C: microtask vs macrotask ---
console.log("C1");
setTimeout(() => console.log("C2 - macrotask"), 0);
Promise.resolve().then(() => console.log("C3 - microtask"));
console.log("C4");
// Expected order: ?, ?, ?, ?


// --- Block D: chained promises vs timeout ---
console.log("D1");
setTimeout(() => console.log("D2 - timeout"), 0);
Promise.resolve()
  .then(() => { console.log("D3 - promise 1"); return Promise.resolve(); })
  .then(() => console.log("D4 - promise 2"))
  .then(() => console.log("D5 - promise 3"));
console.log("D6");
// Expected order: ?, ?, ?, ?, ?, ?


// --- Block E: the tricky one ---
console.log("E1");

setTimeout(() => {
  console.log("E2 - outer timeout");
  Promise.resolve().then(() => console.log("E3 - microtask inside timeout"));
}, 0);

Promise.resolve().then(() => {
  console.log("E4 - microtask 1");
  setTimeout(() => console.log("E5 - timeout inside microtask"), 0);
}).then(() => console.log("E6 - microtask 2"));

console.log("E7");
// Expected order: ?, ?, ?, ?, ?, ?, ?
// Hint: microtasks from inside a macrotask run before the NEXT macrotask
