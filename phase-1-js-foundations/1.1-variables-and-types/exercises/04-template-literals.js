// Exercise 4: Template Literals
// ------------------------------
// Complete each function using template literals (backtick strings).

// 4a. Greet a user by name and age
function greet(name, age) {
  // Return: "Hello, Alice! You are 30 years old."
  // YOUR CODE HERE
}

// 4b. Format a price with currency
function formatPrice(amount, currency) {
  // Return: "Price: $19.99"
  // YOUR CODE HERE
}

// 4c. Multi-line address (use a template literal, not \n)
function formatAddress(street, city, country) {
  // Return a 3-line string:
  // Street: 123 Main St
  // City: Springfield
  // Country: USA
  // YOUR CODE HERE
}

// 4d. Nested expression — calculate and embed
function circleArea(radius) {
  // Return: "A circle with radius 5 has area 78.54"
  // Hint: Math.PI, .toFixed(2)
  // YOUR CODE HERE
}

// Tests (do not modify)
console.log(greet("Alice", 30));
console.log(formatPrice(19.99, "$"));
console.log(formatAddress("123 Main St", "Springfield", "USA"));
console.log(circleArea(5));
