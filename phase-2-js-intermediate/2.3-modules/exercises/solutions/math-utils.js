export function add(a, b) { return a + b; }
export function subtract(a, b) { return a - b; }
export function multiply(a, b) { return a * b; }
export const PI = Math.PI;

export default class Calculator {
  #result = 0;
  add(n) { this.#result += n; return this; }
  subtract(n) { this.#result -= n; return this; }
  multiply(n) { this.#result *= n; return this; }
  divide(n) {
    if (n === 0) throw new Error("Cannot divide by zero");
    this.#result /= n;
    return this;
  }
  getValue() { return this.#result; }
  reset() { this.#result = 0; return this; }
}
