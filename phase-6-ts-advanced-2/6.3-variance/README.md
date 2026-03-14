# 6.3 Variance in Generics

## Concepts

Variance describes how subtype relationships between `Generic<T>` relate to subtype relationships of `T`.

Given: `Dog extends Animal` (Dog is a subtype of Animal)

### Covariance — `Generic<Dog>` extends `Generic<Animal>`
Safe when the type is only **produced** (read). Return types are covariant.

```ts
// ReadonlyArray is covariant — you can only read
const dogs: ReadonlyArray<Dog> = [new Dog()];
const animals: ReadonlyArray<Animal> = dogs; // OK
```

### Contravariance — `Generic<Animal>` extends `Generic<Dog>`
Safe when the type is only **consumed** (written). Function parameters are contravariant.

```ts
// A handler for Animal can handle Dog too (Dog has everything Animal has)
type Handler<T> = (val: T) => void;
const handleAnimal: Handler<Animal> = a => console.log(a.name);
const handleDog: Handler<Dog> = handleAnimal; // OK — contravariant
```

### Invariance — neither direction is safe
Mutable containers are invariant — assigning `Array<Dog>` to `Array<Animal>` would allow pushing a `Cat`.

```ts
const dogs: Array<Dog> = [];
// const animals: Array<Animal> = dogs; // Unsafe — would allow animals.push(new Cat())
```

### TypeScript variance annotations (TS 4.7+)
```ts
type Provider<out T> = () => T;       // covariant — only produces T
type Consumer<in T>  = (v: T) => void; // contravariant — only consumes T
```

## Resources
- [TypeScript 4.7: Variance annotations](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-7.html#optional-variance-annotations-for-type-parameters)
- [What are covariance and contravariance?](https://www.stephanboyer.com/post/132/what-are-covariance-and-contravariance)

## Exercises
Go to the [exercises](./exercises/) folder.
