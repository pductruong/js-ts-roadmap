class Matrix {
  constructor(data) { this.data = data; }
  [Symbol.iterator]() {
    let i = 0;
    const data = this.data;
    return { next: () => i < data.length ? { value: data[i++], done: false } : { value: undefined, done: true } };
  }
}

class Money {
  constructor(amount, currency = "£") { this.amount = amount; this.currency = currency; }
  [Symbol.toPrimitive](hint) {
    if (hint === "string") return `${this.currency}${this.amount.toFixed(2)}`;
    return this.amount;
  }
}

class PositiveInteger {
  static [Symbol.hasInstance](value) {
    return typeof value === "number" && Number.isInteger(value) && value > 0;
  }
}

class EventQueue {
  constructor() { this.queue = []; }
  enqueue(item) { this.queue.push(item); }
  dequeue() { return this.queue.shift(); }
  get [Symbol.toStringTag]() { return "EventQueue"; }
}

const matrix = new Matrix([[1,2],[3,4],[5,6]]);
for (const row of matrix) console.log(row);
console.log([...matrix]);

const price = new Money(12.5);
console.log(+price); console.log(`${price}`); console.log(price + 10);

console.log(5 instanceof PositiveInteger);
console.log(-1 instanceof PositiveInteger);
console.log(3.14 instanceof PositiveInteger);
console.log(0 instanceof PositiveInteger);

const queue = new EventQueue();
console.log(Object.prototype.toString.call(queue));
