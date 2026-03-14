import Calculator, { add, subtract, multiply, PI } from "./math-utils.js";

console.log(add(2, 3));
console.log(subtract(10, 4));
console.log(multiply(3, 7));
console.log(PI.toFixed(5));

const calc = new Calculator();
const result = calc.add(10).multiply(3).subtract(5).getValue();
console.log(result); // 25
