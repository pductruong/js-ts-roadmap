abstract class Vehicle {
  abstract getFuelType(): string;
  abstract getMaxSpeed(): number;
  describe(): string {
    return `A ${this.constructor.name} running on ${this.getFuelType()} up to ${this.getMaxSpeed()}km/h`;
  }
}

class ElectricCar extends Vehicle {
  getFuelType() { return "electricity"; }
  getMaxSpeed() { return 250; }
}

class Bicycle extends Vehicle {
  getFuelType() { return "human power"; }
  getMaxSpeed() { return 40; }
}

interface Printable { print(): void; }
interface Exportable { export(format: "json" | "csv"): string; }

class Report implements Printable, Exportable {
  constructor(
    private title: string,
    private data: Record<string, unknown>[]
  ) {}

  print(): void {
    console.log(`Report: ${this.title} (${this.data.length} rows)`);
  }

  export(format: "json" | "csv"): string {
    if (format === "json") return JSON.stringify(this.data);
    if (this.data.length === 0) return "";
    const keys = Object.keys(this.data[0]!);
    const header = keys.join(",");
    const rows = this.data.map(row => keys.map(k => row[k]).join(","));
    return [header, ...rows].join("\n");
  }
}

const car = new ElectricCar();
console.log(car.describe());
const bike = new Bicycle();
console.log(bike.describe());
const report = new Report("Sales", [{ name: "Alice", amount: 100 }, { name: "Bob", amount: 200 }]);
report.print();
console.log(report.export("json"));
