// Exercise: Module Augmentation & Ambient Declarations
// -----------------------------------------------------

// 1. Augment the built-in String interface to add a toSlug() method
// toSlug() should: trim, lowercase, replace spaces with dashes
declare global {
  interface String {
    toSlug(): string;
  }
}

// Implement it on the prototype
String.prototype.toSlug = function(): string {
  // YOUR CODE HERE
};

// 2. Declare an ambient constant that "exists globally" (as if injected by a build tool)
declare const __APP_VERSION__: string;
declare const ENV: "development" | "production" | "test";

// Simulate the globals being available
(globalThis as any).__APP_VERSION__ = "1.0.0";
(globalThis as any).ENV = "development";

// Tests
console.log("  Hello World  ".toSlug()); // "hello-world"
console.log("TypeScript Rocks".toSlug()); // "typescript-rocks"
console.log(__APP_VERSION__);             // "1.0.0"
console.log(ENV);                         // "development"

export {}; // make this a module (required for global augmentation)
