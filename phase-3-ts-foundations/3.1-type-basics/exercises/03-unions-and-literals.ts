// Exercise 3: Union Types, Literal Types & Type Narrowing
// --------------------------------------------------------

// 3a. Define a literal union type for traffic light colors
type TrafficLight = // YOUR CODE HERE

// 3b. Return the next state in the cycle: red -> green -> yellow -> red
function nextLight(current: TrafficLight): TrafficLight {
  // YOUR CODE HERE
}

// 3c. This function accepts string or number. Handle each type correctly.
// If string: return its length. If number: return it doubled.
function process(input: string | number): number {
  // YOUR CODE HERE (use typeof narrowing)
}

// 3d. Define a discriminated union for different shapes
type Circle = { kind: "circle"; radius: number };
type Rect = { kind: "rect"; width: number; height: number };
type Triangle = { kind: "triangle"; base: number; height: number };
type Shape = Circle | Rect | Triangle;

// Calculate area based on shape kind
function area(shape: Shape): number {
  // YOUR CODE HERE (use switch on shape.kind)
}

// 3e. unknown type — safely extract a name property
function getName(value: unknown): string {
  // Return the name if value is an object with a string name property
  // Otherwise return "unknown"
  // YOUR CODE HERE
}

// Tests
console.log(nextLight("red"));    // "green"
console.log(nextLight("green"));  // "yellow"
console.log(nextLight("yellow")); // "red"

console.log(process("hello")); // 5
console.log(process(21));      // 42

console.log(area({ kind: "circle", radius: 5 }).toFixed(2));      // "78.54"
console.log(area({ kind: "rect", width: 4, height: 6 }));          // 24
console.log(area({ kind: "triangle", base: 6, height: 4 }));       // 12

console.log(getName({ name: "Alice" })); // "Alice"
console.log(getName({ age: 30 }));       // "unknown"
console.log(getName("not an object"));   // "unknown"
