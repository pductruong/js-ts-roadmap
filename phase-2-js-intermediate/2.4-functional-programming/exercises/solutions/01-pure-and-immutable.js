function applyDiscountPure(price, discountRate) {
  return price * (1 - discountRate);
}

function addItemPure(arr, item) {
  return [...arr, item];
}

function updateUserPure(user, key, value) {
  return { ...user, [key]: value };
}

function netBalance(transactions) {
  return transactions.reduce((balance, tx) => {
    return tx.type === "credit" ? balance + tx.amount : balance - tx.amount;
  }, 0);
}

console.log(applyDiscountPure(100, 0.1));
console.log(applyDiscountPure(200, 0.2));
const arr = [1, 2, 3];
const newArr = addItemPure(arr, 4);
console.log(newArr); console.log(arr);
const user = { name: "Alice", age: 30 };
const updated = updateUserPure(user, "age", 31);
console.log(updated); console.log(user);
const txns = [
  { amount: 100, type: "credit" },
  { amount: 30, type: "debit" },
  { amount: 50, type: "credit" },
];
console.log(netBalance(txns));
