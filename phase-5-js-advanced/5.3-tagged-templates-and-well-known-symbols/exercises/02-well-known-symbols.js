// Exercise 2: Well-known Symbols
// --------------------------------

// 2a. Make a Matrix class iterable using Symbol.iterator
// Iteration should yield each row as an array.
class Matrix {
  constructor(data) {
    this.data = data; // 2D array
  }

  [Symbol.iterator]() {
    // YOUR CODE HERE: yield each row
  }
}

// 2b. Use Symbol.toPrimitive on a Money class
// number hint: return the numeric amount
// string hint: return "£12.50"
// default: return the numeric amount
class Money {
  constructor(amount, currency = "£") {
    this.amount = amount;
    this.currency = currency;
  }

  [Symbol.toPrimitive](hint) {
    // YOUR CODE HERE
  }
}

// 2c. Use Symbol.hasInstance to make isPositiveInteger work with instanceof
class PositiveInteger {
  static [Symbol.hasInstance](value) {
    // YOUR CODE HERE: true if value is an integer > 0
  }
}

// 2d. Use Symbol.toStringTag to give a custom class a proper toString identity
class EventQueue {
  constructor() { this.queue = []; }
  enqueue(item) { this.queue.push(item); }
  dequeue() { return this.queue.shift(); }

  get [Symbol.toStringTag]() {
    // YOUR CODE HERE: return "EventQueue"
  }
}

// Tests
const matrix = new Matrix([[1, 2], [3, 4], [5, 6]]);
for (const row of matrix) console.log(row); // [1,2], [3,4], [5,6]
console.log([...matrix]); // [[1,2],[3,4],[5,6]]

const price = new Money(12.5);
console.log(+price);        // 12.5
console.log(`${price}`);    // "£12.50"
console.log(price + 10);    // 22.5

console.log(5 instanceof PositiveInteger);    // true
console.log(-1 instanceof PositiveInteger);   // false
console.log(3.14 instanceof PositiveInteger); // false
console.log(0 instanceof PositiveInteger);    // false

const queue = new EventQueue();
console.log(Object.prototype.toString.call(queue)); // "[object EventQueue]"
