// Exercise 1: Pure Functions & Immutability
// ------------------------------------------

// 1a. These functions are impure. Rewrite them as pure functions.

let discount = 0.1;
// Impure:
function applyDiscount(price) { return price * (1 - discount); }
// Pure version:
function applyDiscountPure(price, discountRate) {
  // YOUR CODE HERE
}

// 1b. These functions mutate their input. Fix them to return new values.
function addItem(arr, item) {
  arr.push(item); // mutates!
  return arr;
}
function addItemPure(arr, item) {
  // YOUR CODE HERE
}

function updateUser(user, key, value) {
  user[key] = value; // mutates!
  return user;
}
function updateUserPure(user, key, value) {
  // YOUR CODE HERE
}

// 1c. Pure transformation pipeline
// Given an array of transactions { amount, type: "credit"|"debit" },
// return the net balance (sum credits - sum debits), without mutating input.
function netBalance(transactions) {
  // YOUR CODE HERE
}

// Tests
console.log(applyDiscountPure(100, 0.1)); // 90
console.log(applyDiscountPure(200, 0.2)); // 160

const arr = [1, 2, 3];
const newArr = addItemPure(arr, 4);
console.log(newArr); // [1, 2, 3, 4]
console.log(arr);    // [1, 2, 3] — unchanged

const user = { name: "Alice", age: 30 };
const updated = updateUserPure(user, "age", 31);
console.log(updated); // { name: "Alice", age: 31 }
console.log(user);    // { name: "Alice", age: 30 } — unchanged

const txns = [
  { amount: 100, type: "credit" },
  { amount: 30, type: "debit" },
  { amount: 50, type: "credit" },
];
console.log(netBalance(txns)); // 120
