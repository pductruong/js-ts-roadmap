// Exercise 1: Access Modifiers & Parameter Properties
// -----------------------------------------------------

// 1a. Rewrite this class using parameter properties shorthand
class PersonVerbose {
  public name: string;
  private age: number;
  readonly id: number;

  constructor(name: string, age: number, id: number) {
    this.name = name;
    this.age = age;
    this.id = id;
  }

  getAge(): number { return this.age; }
  birthday(): void { this.age++; }
}

// Rewrite using shorthand:
class Person {
  constructor(
    // YOUR CODE HERE
  ) {}

  getAge(): number { return this.age; }
  birthday(): void { this.age++; }
}

// 1b. Create a BankAccount class
// - private balance (starts at 0)
// - public readonly accountNumber (set in constructor)
// - public deposit(amount: number): void
// - public withdraw(amount: number): void — throw if insufficient
// - public get balance(): number
class BankAccount {
  // YOUR CODE HERE (use parameter properties where possible)
}

// Tests
const p = new Person("Alice", 30, 1);
console.log(p.name);      // "Alice"
console.log(p.getAge());  // 30
p.birthday();
console.log(p.getAge());  // 31
// p.age; // Error: private

const acc = new BankAccount("ACC-001");
acc.deposit(500);
acc.withdraw(200);
console.log(acc.balance);        // 300
console.log(acc.accountNumber);  // "ACC-001"
try { acc.withdraw(1000); } catch (e: any) { console.log(e.message); }
