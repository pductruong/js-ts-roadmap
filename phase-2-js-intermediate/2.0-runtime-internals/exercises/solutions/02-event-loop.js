// Solution: Event Loop Output Order

// Block A: A1, A3, A2
console.log("A1");
setTimeout(() => console.log("A2"), 0);
console.log("A3");

// Block B: B1, B4, B3, B2
console.log("B1");
setTimeout(() => console.log("B2 - timeout 100"), 100);
setTimeout(() => console.log("B3 - timeout 0"), 0);
console.log("B4");

// Block C: C1, C4, C3, C2
// Microtask (Promise) runs before macrotask (setTimeout)
console.log("C1");
setTimeout(() => console.log("C2 - macrotask"), 0);
Promise.resolve().then(() => console.log("C3 - microtask"));
console.log("C4");

// Block D: D1, D6, D3, D4, D5, D2
// All microtasks drain before any macrotask runs
console.log("D1");
setTimeout(() => console.log("D2 - timeout"), 0);
Promise.resolve()
  .then(() => { console.log("D3 - promise 1"); return Promise.resolve(); })
  .then(() => console.log("D4 - promise 2"))
  .then(() => console.log("D5 - promise 3"));
console.log("D6");

// Block E: E1, E7, E4, E6, E2, E3, E5
// After sync (E1, E7): drain microtasks (E4, then E6)
// E4's .then also queues a timeout (E5) but that's a macrotask
// First macrotask runs: E2, then its microtask E3 runs before next macrotask
// Last macrotask: E5
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
