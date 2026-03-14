class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
  area() { return this.width * this.height; }
  perimeter() { return 2 * (this.width + this.height); }
  isSquare() { return this.width === this.height; }
  static fromSquare(side) { return new Rectangle(side, side); }
}

class BankAccount {
  #balance = 0;
  deposit(amount) { this.#balance += amount; }
  withdraw(amount) {
    if (amount > this.#balance) throw new Error("Insufficient funds");
    this.#balance -= amount;
  }
  get balance() { return this.#balance; }
}

class Stack {
  #items = [];
  push(item) { this.#items.push(item); }
  pop() { return this.#items.pop(); }
  peek() { return this.#items[this.#items.length - 1]; }
  isEmpty() { return this.#items.length === 0; }
  get size() { return this.#items.length; }
}

const rect = new Rectangle(4, 6);
console.log(rect.area()); console.log(rect.perimeter()); console.log(rect.isSquare());
const square = Rectangle.fromSquare(5);
console.log(square.area()); console.log(square.isSquare());
const account = new BankAccount();
account.deposit(100); account.withdraw(30);
console.log(account.balance);
try { account.withdraw(200); } catch (e) { console.log(e.message); }
const stack = new Stack();
stack.push(1); stack.push(2); stack.push(3);
console.log(stack.peek()); console.log(stack.pop()); console.log(stack.size); console.log(stack.isEmpty());
