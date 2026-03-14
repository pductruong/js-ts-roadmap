function greet(name, age) {
  return `Hello, ${name}! You are ${age} years old.`;
}

function formatPrice(amount, currency) {
  return `Price: ${currency}${amount}`;
}

function formatAddress(street, city, country) {
  return `Street: ${street}
City: ${city}
Country: ${country}`;
}

function circleArea(radius) {
  return `A circle with radius ${radius} has area ${(Math.PI * radius ** 2).toFixed(2)}`;
}

console.log(greet("Alice", 30));
console.log(formatPrice(19.99, "$"));
console.log(formatAddress("123 Main St", "Springfield", "USA"));
console.log(circleArea(5));
