class Range {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }
  [Symbol.iterator]() {
    let current = this.start;
    const end = this.end;
    return {
      next() {
        return current <= end
          ? { value: current++, done: false }
          : { value: undefined, done: true };
      }
    };
  }
}

class InfiniteCounter {
  constructor(start = 0) { this.start = start; }
  [Symbol.iterator]() {
    let current = this.start;
    return {
      next() { return { value: current++, done: false }; }
    };
  }
}

class LinkedList {
  constructor() { this.head = null; }
  append(value) {
    const node = { value, next: null };
    if (!this.head) { this.head = node; return; }
    let curr = this.head;
    while (curr.next) curr = curr.next;
    curr.next = node;
  }
  [Symbol.iterator]() {
    let current = this.head;
    return {
      next() {
        if (current) {
          const value = current.value;
          current = current.next;
          return { value, done: false };
        }
        return { value: undefined, done: true };
      }
    };
  }
}

const r = new Range(1, 5);
console.log([...r]);
for (const n of r) process.stdout.write(n + " ");
console.log();

const counter = new InfiniteCounter(10);
const first5 = [];
for (const n of counter) {
  first5.push(n);
  if (first5.length === 5) break;
}
console.log(first5);

const list = new LinkedList();
list.append(1); list.append(2); list.append(3);
console.log([...list]);
