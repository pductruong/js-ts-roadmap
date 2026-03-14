# 2.1 Prototypes & OOP

## Concepts

### Prototype Chain
Every object has a hidden `[[Prototype]]` link. Property lookups travel up this chain.
```js
const arr = [1, 2, 3];
// arr -> Array.prototype -> Object.prototype -> null
```

### Constructor Functions (old style)
```js
function Animal(name) {
  this.name = name;
}
Animal.prototype.speak = function() {
  return `${this.name} makes a sound.`;
};
const dog = new Animal("Rex");
```

### class (modern, preferred)
```js
class Animal {
  #sound; // private field

  constructor(name, sound) {
    this.name = name;
    this.#sound = sound;
  }

  speak() {
    return `${this.name} says ${this.#sound}`;
  }

  static create(name, sound) { // static — called on class, not instance
    return new Animal(name, sound);
  }

  get label() { return `[${this.name}]`; }     // getter
  set label(val) { this.name = val.slice(1,-1); } // setter
}

class Dog extends Animal {
  constructor(name) {
    super(name, "woof"); // must call super first
  }

  fetch(item) { return `${this.name} fetches ${item}`; }
}
```

### instanceof & Object.create
```js
dog instanceof Dog;    // true
dog instanceof Animal; // true

const obj = Object.create(proto); // obj's prototype is proto
```

## Resources
- [javascript.info: Prototypes](https://javascript.info/prototype-inheritance)
- [javascript.info: Classes](https://javascript.info/classes)
- [javascript.info: Private fields](https://javascript.info/private-protected-properties-methods)
- [javascript.info: Static methods](https://javascript.info/static-properties-methods)

## Exercises
Go to the [exercises](./exercises/) folder.
