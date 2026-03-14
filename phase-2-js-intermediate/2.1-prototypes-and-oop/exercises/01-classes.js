// Exercise 1: Classes
// --------------------

// 1a. Create a Rectangle class
// Properties: width, height
// Methods: area(), perimeter(), isSquare()
// Static: fromSquare(side) — creates a square rectangle
class Rectangle {
  // YOUR CODE HERE
}

// 1b. Create a BankAccount class
// Private field: #balance (default 0)
// Methods: deposit(amount), withdraw(amount) — throw if insufficient funds
// Getter: balance
class BankAccount {
  // YOUR CODE HERE
}

// 1c. Create a Stack class (LIFO)
// Methods: push(item), pop(), peek(), isEmpty()
// Getter: size
class Stack {
  // YOUR CODE HERE
}

// Tests
const rect = new Rectangle(4, 6);
console.log(rect.area());       // 24
console.log(rect.perimeter());  // 20
console.log(rect.isSquare());   // false

const square = Rectangle.fromSquare(5);
console.log(square.area());     // 25
console.log(square.isSquare()); // true

const account = new BankAccount();
account.deposit(100);
account.withdraw(30);
console.log(account.balance);   // 70
try { account.withdraw(200); } catch (e) { console.log(e.message); } // "Insufficient funds"

const stack = new Stack();
stack.push(1); stack.push(2); stack.push(3);
console.log(stack.peek());  // 3
console.log(stack.pop());   // 3
console.log(stack.size);    // 2
console.log(stack.isEmpty()); // false
