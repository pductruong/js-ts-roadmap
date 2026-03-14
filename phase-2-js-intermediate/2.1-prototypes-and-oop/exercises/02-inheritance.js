// Exercise 2: Inheritance
// ------------------------

// 2a. Build a shape hierarchy
// Shape (base): has color property, describe() method returns "A {color} shape"
// Circle (extends Shape): has radius, area() = PI*r^2, describe() overrides to "A {color} circle"
// Rectangle (extends Shape): has width/height, area(), describe() overrides

class Shape {
  // YOUR CODE HERE
}

class Circle extends Shape {
  // YOUR CODE HERE
}

class Rectangle extends Shape {
  // YOUR CODE HERE
}

// 2b. Build a simple Animal hierarchy
// Animal: name, makeSound() returns "..."
// Dog extends Animal: makeSound() returns "Woof!", fetch(item) returns "{name} fetches {item}"
// Cat extends Animal: makeSound() returns "Meow!", purr() returns "Purrrr"

class Animal {
  // YOUR CODE HERE
}

class Dog extends Animal {
  // YOUR CODE HERE
}

class Cat extends Animal {
  // YOUR CODE HERE
}

// Tests
const c = new Circle("red", 5);
console.log(c.describe());                          // "A red circle"
console.log(c.area().toFixed(2));                   // "78.54"

const r = new Rectangle("blue", 4, 6);
console.log(r.describe());                          // "A blue rectangle"
console.log(r.area());                              // 24

const dog = new Dog("Rex");
console.log(dog.makeSound());    // "Woof!"
console.log(dog.fetch("ball"));  // "Rex fetches ball"
console.log(dog instanceof Dog);    // true
console.log(dog instanceof Animal); // true

const cat = new Cat("Luna");
console.log(cat.makeSound()); // "Meow!"
console.log(cat.purr());      // "Purrrr"
