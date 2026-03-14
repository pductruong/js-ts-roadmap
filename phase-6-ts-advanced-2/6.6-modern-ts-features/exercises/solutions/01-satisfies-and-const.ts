type Color = "red" | "green" | "blue";
type ColorMap = Record<string, Color | [number, number, number]>;

const palette = {
  red: [255, 0, 0],
  green: "green",
  blue: [0, 0, 255],
} satisfies ColorMap;

console.log(palette.red.map(v => v * 2));
console.log(palette.green.toUpperCase());

type LogLevel = "debug" | "info" | "warn" | "error";
type AppConfig = { logLevel: LogLevel; port: number; features: Record<string, boolean>; };

const config = {
  logLevel: "info",
  port: 3000,
  features: { darkMode: true, betaSignup: false },
} satisfies AppConfig;

console.log(config.logLevel);
console.log(config.features.darkMode);

function createConfig<const T extends Record<string, unknown>>(cfg: T): T { return cfg; }
const routeConfig = createConfig({ path: "/users", method: "GET", auth: true });
console.log(routeConfig.path, routeConfig.method);

function toReadonlyTuple<const T extends readonly unknown[]>(...args: T): T { return args; }
const tuple = toReadonlyTuple(1, "hello", true);
console.log(tuple);
