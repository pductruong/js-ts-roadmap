function assert(condition: boolean, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function assertDefined<T>(value: T, name = "Value"): asserts value is NonNullable<T> {
  if (value == null) throw new Error(`${name} must not be null or undefined`);
}

function assertIsString(value: unknown, name = "Value"): asserts value is string {
  if (typeof value !== "string")
    throw new TypeError(`${name} must be a string, got ${typeof value}`);
}

interface AppConfig { host: string; port: number; debug: boolean; }

function assertIsConfig(value: unknown): asserts value is AppConfig {
  assert(typeof value === "object" && value !== null, "Config must be an object");
  const v = value as any;
  assert(typeof v.host === "string",   "Config.host must be a string");
  assert(typeof v.port === "number",   "Config.port must be a number");
  assert(typeof v.debug === "boolean", "Config.debug must be a boolean");
}

function loadConfig(raw: unknown): AppConfig { assertIsConfig(raw); return raw; }

assert(2 + 2 === 4, "Math works");
console.log("assert passed");
try { assert(false, "boom"); } catch (e: any) { console.log(e.message); }
const nullable: string | null = "Alice";
assertDefined(nullable, "name");
console.log(nullable.toUpperCase());
assertIsString("hello");
try { assertIsString(42); } catch (e: any) { console.log(e.message); }
const cfg = loadConfig({ host: "localhost", port: 3000, debug: true });
console.log(cfg.host, cfg.port);
try { loadConfig({ host: "localhost" }); } catch (e: any) { console.log(e.message); }
