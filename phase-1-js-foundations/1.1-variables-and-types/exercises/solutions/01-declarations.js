// Solution: Variable Declarations

// 1a.
let age = 25;

// 1b.
age = 26;

// 1c.
const PI = 3.14159;

// 1d. PI = 3; => TypeError: Assignment to constant variable.

// 1e.
{
  let secret = "hidden";
  // secret is accessible here
}
// console.log(secret); => ReferenceError: secret is not defined

console.log("Done! age is:", age);
