type Brand<T, B> = T & { readonly _brand: B };
type UserId    = Brand<number, "UserId">;
type ProductId = Brand<number, "ProductId">;
type OrderId   = Brand<number, "OrderId">;
type Email     = Brand<string, "Email">;
type PositiveNumber = Brand<number, "PositiveNumber">;

const asUserId    = (n: number): UserId    => n as UserId;
const asProductId = (n: number): ProductId => n as ProductId;
const asOrderId   = (n: number): OrderId   => n as OrderId;

function getUser(id: UserId): string { return `User #${id}`; }
function getProduct(id: ProductId): string { return `Product #${id}`; }
function createOrder(userId: UserId, productId: ProductId): OrderId {
  return asOrderId(userId + productId);
}

function parseEmail(input: string): Email {
  if (!input.includes("@")) throw new Error(`Invalid email: ${input}`);
  return input as Email;
}
function sendEmail(to: Email, subject: string): void { console.log(`Sending "${subject}" to ${to}`); }

function asPositive(n: number): PositiveNumber {
  if (n <= 0) throw new Error(`Expected positive number, got ${n}`);
  return n as PositiveNumber;
}
function setPrice(price: PositiveNumber): void { console.log(`Price set to ${price}`); }

const uid = asUserId(1);
const pid = asProductId(99);
console.log(getUser(uid));
console.log(getProduct(pid));
console.log(`Order #${createOrder(uid, pid)}`);
const email = parseEmail("alice@example.com");
sendEmail(email, "Welcome!");
try { parseEmail("not-an-email"); } catch (e: any) { console.log(e.message); }
setPrice(asPositive(29.99));
try { asPositive(-5); } catch (e: any) { console.log(e.message); }
