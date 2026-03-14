# 3.3 Classes in TypeScript

## Concepts

### Access Modifiers
```ts
class Person {
  public name: string;        // accessible everywhere (default)
  private age: number;        // only within this class
  protected email: string;    // within this class and subclasses
  readonly id: number;        // can't be reassigned after construction

  constructor(name: string, age: number, email: string) {
    this.id = Math.random();
    this.name = name;
    this.age = age;
    this.email = email;
  }
}
```

### Parameter Properties Shorthand
```ts
class Person {
  constructor(
    public name: string,
    private age: number,
    protected email: string,
    readonly id: number,
  ) {}
}
// Equivalent to declaring and assigning in constructor body
```

### Abstract Classes
```ts
abstract class Shape {
  abstract area(): number; // must be implemented by subclasses
  describe(): string {
    return `This shape has area ${this.area().toFixed(2)}`;
  }
}

class Circle extends Shape {
  constructor(private radius: number) { super(); }
  area(): number { return Math.PI * this.radius ** 2; }
}
```

### Implementing Interfaces
```ts
interface Printable {
  print(): void;
}

interface Serializable {
  serialize(): string;
}

class Document implements Printable, Serializable {
  constructor(private content: string) {}
  print() { console.log(this.content); }
  serialize() { return JSON.stringify({ content: this.content }); }
}
```

## Resources
- [TypeScript Handbook: Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html)

## Exercises
Go to the [exercises](./exercises/) folder.
