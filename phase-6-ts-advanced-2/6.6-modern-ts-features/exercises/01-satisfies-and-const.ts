// Exercise 1: satisfies and const type parameters
// -------------------------------------------------

// 1a. satisfies — validate without widening
type Color = "red" | "green" | "blue";
type ColorMap = Record<string, Color | [number, number, number]>;

// The problem with regular type annotation:
const paletteAnnotated: ColorMap = {
  red: [255, 0, 0],
  green: "green",
  blue: [0, 0, 255],
};
// paletteAnnotated.red is Color | [number, number, number] — can't call .map()

// Fix using satisfies:
const palette = {
  red: [255, 0, 0],
  green: "green",
  blue: [0, 0, 255],
} satisfies ColorMap;

// Now palette.red is inferred as [number, number, number]
console.log(palette.red.map(v => v * 2)); // [510, 0, 0]
console.log(palette.green.toUpperCase()); // "GREEN" — knows it's a string

// 1b. satisfies for config validation
type LogLevel = "debug" | "info" | "warn" | "error";
type AppConfig = {
  logLevel: LogLevel;
  port: number;
  features: Record<string, boolean>;
};

// Use satisfies to validate this config while keeping specific types
const config = {
  logLevel: "info",
  port: 3000,
  features: {
    darkMode: true,
    betaSignup: false,
  },
} satisfies AppConfig;

// config.logLevel is "info" (not just LogLevel)
// config.features.darkMode is boolean
console.log(config.logLevel);            // "info"
console.log(config.features.darkMode);  // true

// 1c. const type parameters
// Without const — loses literal types
function makeRoute<T extends string>(path: T): { path: T } {
  return { path };
}

// With const — preserves literal type even for arrays/objects
function createConfig<const T extends Record<string, unknown>>(cfg: T): T {
  return cfg;
}

const routeConfig = createConfig({
  path: "/users",
  method: "GET",
  auth: true,
});
// routeConfig.path is "/users" (not string), routeConfig.method is "GET" (not string)
console.log(routeConfig.path);   // "/users"
console.log(routeConfig.method); // "GET"

// 1d. const + tuple inference
function toReadonlyTuple<const T extends readonly unknown[]>(...args: T): T {
  return args;
}

const tuple = toReadonlyTuple(1, "hello", true);
// tuple is readonly [1, "hello", true] — literal types preserved
console.log(tuple); // [1, "hello", true]
