// Exercise 1: Branded Types
// --------------------------

// 1a. Create the Brand utility type and three distinct ID types
type Brand<T, B> = T & { readonly _brand: B };

type UserId    = Brand<number, "UserId">;
type ProductId = Brand<number, "ProductId">;
type OrderId   = Brand<number, "OrderId">;

const asUserId    = (n: number): UserId    => n as UserId;
const asProductId = (n: number): ProductId => n as ProductId;
const asOrderId   = (n: number): OrderId   => n as OrderId;

// 1b. These functions must only accept their specific ID type
function getUser(id: UserId): string {
  return `User #${id}`;
}

function getProduct(id: ProductId): string {
  return `Product #${id}`;
}

function createOrder(userId: UserId, productId: ProductId): OrderId {
  // YOUR CODE HERE: return a new OrderId
}

// 1c. Branded Email type with runtime validation
type Email = Brand<string, "Email">;

function parseEmail(input: string): Email {
  if (!input.includes("@")) throw new Error(`Invalid email: ${input}`);
  return input as Email;
}

function sendEmail(to: Email, subject: string): void {
  console.log(`Sending "${subject}" to ${to}`);
}

// 1d. PositiveNumber branded type
type PositiveNumber = Brand<number, "PositiveNumber">;

function asPositive(n: number): PositiveNumber {
  if (n <= 0) throw new Error(`Expected positive number, got ${n}`);
  return n as PositiveNumber;
}

function setPrice(price: PositiveNumber): void {
  console.log(`Price set to ${price}`);
}

// Tests
const uid = asUserId(1);
const pid = asProductId(99);

console.log(getUser(uid));    // "User #1"
console.log(getProduct(pid)); // "Product #99"
// getUser(pid);              // TypeScript Error (uncomment to verify)

const orderId = createOrder(uid, pid);
console.log(`Order #${orderId}`);

const email = parseEmail("alice@example.com");
sendEmail(email, "Welcome!");
// sendEmail("alice@example.com", "Hi"); // TypeScript Error

try { parseEmail("not-an-email"); } catch (e: any) { console.log(e.message); }

setPrice(asPositive(29.99));
try { asPositive(-5); } catch (e: any) { console.log(e.message); }
