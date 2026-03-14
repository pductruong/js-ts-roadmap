type TrafficLight = "red" | "green" | "yellow";

function nextLight(current: TrafficLight): TrafficLight {
  switch (current) {
    case "red": return "green";
    case "green": return "yellow";
    case "yellow": return "red";
  }
}

function process(input: string | number): number {
  if (typeof input === "string") return input.length;
  return input * 2;
}

type Circle = { kind: "circle"; radius: number };
type Rect = { kind: "rect"; width: number; height: number };
type Triangle = { kind: "triangle"; base: number; height: number };
type Shape = Circle | Rect | Triangle;

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle": return Math.PI * shape.radius ** 2;
    case "rect": return shape.width * shape.height;
    case "triangle": return 0.5 * shape.base * shape.height;
  }
}

function getName(value: unknown): string {
  if (typeof value === "object" && value !== null && "name" in value && typeof (value as any).name === "string") {
    return (value as { name: string }).name;
  }
  return "unknown";
}

console.log(nextLight("red"));
console.log(nextLight("green"));
console.log(nextLight("yellow"));
console.log(process("hello"));
console.log(process(21));
console.log(area({ kind: "circle", radius: 5 }).toFixed(2));
console.log(area({ kind: "rect", width: 4, height: 6 }));
console.log(area({ kind: "triangle", base: 6, height: 4 }));
console.log(getName({ name: "Alice" }));
console.log(getName({ age: 30 }));
console.log(getName("not an object"));
