// Exercise 2: Assertion Functions
// --------------------------------

// 2a. assert(condition, message): asserts condition
function assert(condition: boolean, message: string): asserts condition {
  // YOUR CODE HERE
}

// 2b. assertDefined<T>(value): asserts value is NonNullable<T>
function assertDefined<T>(value: T, name = "Value"): asserts value is NonNullable<T> {
  // YOUR CODE HERE
}

// 2c. assertIsString(value): asserts value is string
function assertIsString(value: unknown, name = "Value"): asserts value is string {
  // YOUR CODE HERE
}

// 2d. Type-safe config loader
interface AppConfig {
  host: string;
  port: number;
  debug: boolean;
}

function assertIsConfig(value: unknown): asserts value is AppConfig {
  // YOUR CODE HERE: assert it's an object with host(string), port(number), debug(boolean)
  // Use the assert() function from 2a
}

function loadConfig(raw: unknown): AppConfig {
  assertIsConfig(raw);
  return raw; // TypeScript knows it's AppConfig after the assertion
}

// Tests
assert(2 + 2 === 4, "Math works");
console.log("assert passed");

try { assert(false, "boom"); }
catch (e: any) { console.log(e.message); } // "boom"

const nullable: string | null = "Alice";
assertDefined(nullable, "name");
console.log(nullable.toUpperCase()); // "ALICE"

assertIsString("hello");
try { assertIsString(42); }
catch (e: any) { console.log(e.message); }

const cfg = loadConfig({ host: "localhost", port: 3000, debug: true });
console.log(cfg.host, cfg.port); // "localhost" 3000

try { loadConfig({ host: "localhost" }); }
catch (e: any) { console.log(e.message); }
