interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  inStock?: boolean;
}

type CartItem = Product & { quantity: number };

interface User {
  readonly id: number;
  name: string;
  email: string;
  age?: number;
}

function formatProduct(product: Product): string {
  const base = `${product.name} - $${product.price.toFixed(2)}`;
  return product.inStock === false ? `${base} (out of stock)` : base;
}

function cartTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

const laptop: Product = { id: 1, name: "Laptop", price: 999.99, inStock: true };
const mouse: Product = { id: 2, name: "Mouse", price: 29.99 };

console.log(formatProduct(laptop));
console.log(formatProduct({ ...mouse, inStock: false }));

const cart: CartItem[] = [
  { ...laptop, quantity: 1 },
  { ...mouse, quantity: 2 },
];
console.log(cartTotal(cart).toFixed(2));
