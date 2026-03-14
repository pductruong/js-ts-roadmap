class Person {
  constructor(
    public name: string,
    private age: number,
    readonly id: number,
  ) {}

  getAge(): number { return this.age; }
  birthday(): void { this.age++; }
}

class BankAccount {
  private _balance = 0;

  constructor(readonly accountNumber: string) {}

  deposit(amount: number): void { this._balance += amount; }

  withdraw(amount: number): void {
    if (amount > this._balance) throw new Error("Insufficient funds");
    this._balance -= amount;
  }

  get balance(): number { return this._balance; }
}

const p = new Person("Alice", 30, 1);
console.log(p.name);
console.log(p.getAge());
p.birthday();
console.log(p.getAge());

const acc = new BankAccount("ACC-001");
acc.deposit(500);
acc.withdraw(200);
console.log(acc.balance);
console.log(acc.accountNumber);
try { acc.withdraw(1000); } catch (e: any) { console.log(e.message); }
