class Animal { constructor(public name: string) {} speak() { return `${this.name} speaks`; } }
class Dog extends Animal { constructor(name: string, public breed: string) { super(name); } bark() { return `${this.name} barks`; } }
class Cat extends Animal { constructor(name: string) { super(name); } meow() { return `${this.name} meows`; } }

// 1a. Covariant — safe because ReadonlyArray only allows reads; you can't push a Cat into it
const dogs: ReadonlyArray<Dog> = [new Dog("Rex", "Lab")];
const animals: ReadonlyArray<Animal> = dogs;
console.log(animals[0]?.speak());

// 1b. Invariant — if Array<Dog> were assignable to Array<Animal>,
// you could do mutableAnimals.push(new Cat()), corrupting the dogs array.

// 1c. Contravariant — handleAnimal accepts Animal; Dog extends Animal,
// so handleAnimal works for Dog too. Safe.
type AnimalHandler = (a: Animal) => void;
type DogHandler    = (d: Dog)    => void;
const handleAnimal: AnimalHandler = a => console.log(a.speak());
let dogHandler: DogHandler;
dogHandler = handleAnimal; // Safe — any Animal handler can handle a Dog

// 1d. Covariant return type — Dog has everything Animal has,
// so a function producing Dog satisfies one expecting Animal.
type MakeAnimal = () => Animal;
type MakeDog    = () => Dog;
const makeDog: MakeDog = () => new Dog("Buddy", "Poodle");
const makeAnimal: MakeAnimal = makeDog;

// 1e. Variance annotations
type Producer<out T> = { produce: () => T };
type Consumer<in T>  = { consume: (v: T) => void };
const dogProducer: Producer<Dog> = { produce: () => new Dog("Max", "Beagle") };
const animalProducer: Producer<Animal> = dogProducer;
const animalConsumer: Consumer<Animal> = { consume: a => console.log(a.name) };
const dogConsumer: Consumer<Dog> = animalConsumer;

dogHandler(new Dog("Rex", "Lab"));
console.log(makeAnimal().speak());
console.log(animalProducer.produce().name);
dogConsumer.consume(new Dog("Spot", "Dalmatian"));
