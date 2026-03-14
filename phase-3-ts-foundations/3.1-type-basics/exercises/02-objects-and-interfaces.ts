// Exercise 2: Object Types & Interfaces
// ---------------------------------------

// 2a. Define an interface for a Product
// Required: id (number), name (string), price (number)
// Optional: description (string), inStock (boolean, defaults to true in logic)
interface Product {
  // YOUR CODE HERE
}

// 2b. Define a type alias for a CartItem: a Product plus quantity (number)
type CartItem = // YOUR CODE HERE

// 2c. Define an interface for a User with a readonly id
interface User {
  // YOUR CODE HERE: id (readonly number), name, email, age (optional)
}

// 2d. Write a function that formats a product as a string
// "Product Name - $19.99" or "Product Name - $19.99 (out of stock)"
function formatProduct(product: Product): string {
  // YOUR CODE HERE
}

// 2e. Write a function that calculates cart total
function cartTotal(items: CartItem[]): number {
  // YOUR CODE HERE
}

// Tests
const laptop: Product = { id: 1, name: "Laptop", price: 999.99, inStock: true };
const mouse: Product = { id: 2, name: "Mouse", price: 29.99 };

console.log(formatProduct(laptop));  // "Laptop - $999.99"
console.log(formatProduct({ ...mouse, inStock: false })); // "Mouse - $29.99 (out of stock)"

const cart: CartItem[] = [
  { ...laptop, quantity: 1 },
  { ...mouse, quantity: 2 },
];
console.log(cartTotal(cart)); // 1059.97
