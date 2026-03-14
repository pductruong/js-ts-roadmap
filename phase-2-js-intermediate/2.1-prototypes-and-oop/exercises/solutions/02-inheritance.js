class Shape {
  constructor(color) { this.color = color; }
  describe() { return `A ${this.color} shape`; }
}

class Circle extends Shape {
  constructor(color, radius) { super(color); this.radius = radius; }
  area() { return Math.PI * this.radius ** 2; }
  describe() { return `A ${this.color} circle`; }
}

class Rectangle extends Shape {
  constructor(color, width, height) { super(color); this.width = width; this.height = height; }
  area() { return this.width * this.height; }
  describe() { return `A ${this.color} rectangle`; }
}

class Animal {
  constructor(name) { this.name = name; }
  makeSound() { return "..."; }
}

class Dog extends Animal {
  makeSound() { return "Woof!"; }
  fetch(item) { return `${this.name} fetches ${item}`; }
}

class Cat extends Animal {
  makeSound() { return "Meow!"; }
  purr() { return "Purrrr"; }
}

const c = new Circle("red", 5);
console.log(c.describe()); console.log(c.area().toFixed(2));
const r = new Rectangle("blue", 4, 6);
console.log(r.describe()); console.log(r.area());
const dog = new Dog("Rex");
console.log(dog.makeSound()); console.log(dog.fetch("ball"));
console.log(dog instanceof Dog); console.log(dog instanceof Animal);
const cat = new Cat("Luna");
console.log(cat.makeSound()); console.log(cat.purr());
