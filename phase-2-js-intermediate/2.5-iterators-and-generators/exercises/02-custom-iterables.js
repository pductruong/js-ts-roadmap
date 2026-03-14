// Exercise 2: Custom Iterables
// -----------------------------

// 2a. Make a Range class that is iterable using Symbol.iterator
// Range(1, 5) should work with for...of and spread
class Range {
  constructor(start, end) {
    // YOUR CODE HERE
  }

  [Symbol.iterator]() {
    // YOUR CODE HERE
  }
}

// 2b. Make an InfiniteCounter that counts up from `start`
// It must be stoppable with break in for...of
class InfiniteCounter {
  constructor(start = 0) {
    // YOUR CODE HERE
  }

  [Symbol.iterator]() {
    // YOUR CODE HERE
  }
}

// 2c. Implement a LinkedList that is iterable (yields values head to tail)
class LinkedList {
  constructor() {
    this.head = null;
  }

  append(value) {
    const node = { value, next: null };
    if (!this.head) { this.head = node; return; }
    let curr = this.head;
    while (curr.next) curr = curr.next;
    curr.next = node;
  }

  [Symbol.iterator]() {
    // YOUR CODE HERE
  }
}

// Tests
const r = new Range(1, 5);
console.log([...r]);                // [1, 2, 3, 4, 5]
for (const n of r) process.stdout.write(n + " "); // 1 2 3 4 5
console.log();

const counter = new InfiniteCounter(10);
const first5 = [];
for (const n of counter) {
  first5.push(n);
  if (first5.length === 5) break;
}
console.log(first5); // [10, 11, 12, 13, 14]

const list = new LinkedList();
list.append(1); list.append(2); list.append(3);
console.log([...list]); // [1, 2, 3]
