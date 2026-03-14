declare global {
  interface String {
    toSlug(): string;
  }
}

String.prototype.toSlug = function(): string {
  return this.trim().toLowerCase().replace(/\s+/g, "-");
};

declare const __APP_VERSION__: string;
declare const ENV: "development" | "production" | "test";

(globalThis as any).__APP_VERSION__ = "1.0.0";
(globalThis as any).ENV = "development";

console.log("  Hello World  ".toSlug());
console.log("TypeScript Rocks".toSlug());
console.log(__APP_VERSION__);
console.log(ENV);

export {};
