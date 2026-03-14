// Exercise 1: Understanding Variance
// ------------------------------------

class Animal { constructor(public name: string) {} speak() { return `${this.name} speaks`; } }
class Dog extends Animal { constructor(name: string, public breed: string) { super(name); } bark() { return `${this.name} barks`; } }
class Cat extends Animal { constructor(name: string) { super(name); } meow() { return `${this.name} meows`; } }

// 1a. Covariance — ReadonlyArray (producer)
// Assign ReadonlyArray<Dog> to ReadonlyArray<Animal>. Explain why it's safe.
const dogs: ReadonlyArray<Dog> = [new Dog("Rex", "Lab")];
// YOUR CODE HERE: assign to ReadonlyArray<Animal>
// EXPLAIN: why is this safe?

// 1b. Invariance — mutable Array
const mutableDogs: Array<Dog> = [new Dog("Rex", "Lab")];
// Try: const mutableAnimals: Array<Animal> = mutableDogs;
// If it compiled, what dangerous thing could you do?
// YOUR EXPLANATION:

// 1c. Contravariance — function parameters
type AnimalHandler = (a: Animal) => void;
type DogHandler    = (d: Dog)    => void;

const handleAnimal: AnimalHandler = a => console.log(a.speak());

// Can you assign handleAnimal to a DogHandler? Why?
let dogHandler: DogHandler;
dogHandler = handleAnimal; // YOUR COMMENT: safe or not? why?

// 1d. Return type covariance
// A function returning Dog can be used where Animal is expected
type MakeAnimal = () => Animal;
type MakeDog    = () => Dog;

const makeDog: MakeDog = () => new Dog("Buddy", "Poodle");
const makeAnimal: MakeAnimal = makeDog; // YOUR COMMENT: why is this safe?

// 1e. Variance annotations (TS 4.7+)
type Producer<out T> = { produce: () => T };    // covariant
type Consumer<in T>  = { consume: (v: T) => void }; // contravariant

const dogProducer: Producer<Dog> = { produce: () => new Dog("Max", "Beagle") };
const animalProducer: Producer<Animal> = dogProducer; // covariant — OK

const animalConsumer: Consumer<Animal> = { consume: a => console.log(a.name) };
const dogConsumer: Consumer<Dog> = animalConsumer; // contravariant — OK

// Run to confirm the valid assignments work
dogHandler(new Dog("Rex", "Lab"));
console.log(makeAnimal().speak());
console.log(animalProducer.produce().name);
dogConsumer.consume(new Dog("Spot", "Dalmatian"));
