function addDeclaration(a, b) { return a + b; }
const addExpression = function(a, b) { return a + b; };
const addArrow = (a, b) => { return a + b; };
const addArrowShort = (a, b) => a + b;
const greet = name => `Hello, ${name}`;
const double = n => ({ doubled: n * 2 });

console.log(addDeclaration(2, 3));
console.log(addExpression(2, 3));
console.log(addArrow(2, 3));
console.log(addArrowShort(2, 3));
console.log(greet("Alice"));
console.log(double(5));
