// This is a plain JavaScript file with no types.
// Your job is to write a .d.ts declaration file for it.

export function add(a, b) { return a + b; }
export function subtract(a, b) { return a - b; }
export function multiply(a, b) { return a * b; }
export function divide(a, b) {
  if (b === 0) throw new Error("Cannot divide by zero");
  return a / b;
}
export const PI = Math.PI;
export class Vector2D {
  constructor(x, y) { this.x = x; this.y = y; }
  add(other) { return new Vector2D(this.x + other.x, this.y + other.y); }
  magnitude() { return Math.sqrt(this.x ** 2 + this.y ** 2); }
  toString() { return `Vector2D(${this.x}, ${this.y})`; }
}
