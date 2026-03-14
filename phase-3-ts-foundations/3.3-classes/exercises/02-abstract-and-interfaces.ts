// Exercise 2: Abstract Classes & Interfaces
// ------------------------------------------

// 2a. Define an abstract Vehicle class
// Abstract methods: getFuelType(), getMaxSpeed()
// Concrete method: describe() — "A {type} running on {fuel} up to {speed}km/h"
// where type = class name (use this.constructor.name)
abstract class Vehicle {
  // YOUR CODE HERE
}

// Implement two concrete vehicles:
class ElectricCar extends Vehicle {
  // YOUR CODE HERE: getFuelType() => "electricity", getMaxSpeed() => 250
}

class Bicycle extends Vehicle {
  // YOUR CODE HERE: getFuelType() => "human power", getMaxSpeed() => 40
}

// 2b. Define interfaces and implement them
interface Printable {
  print(): void;
}

interface Exportable {
  export(format: "json" | "csv"): string;
}

// Implement a Report class that satisfies both interfaces
class Report implements Printable, Exportable {
  constructor(
    private title: string,
    private data: Record<string, unknown>[]
  ) {}

  // YOUR CODE HERE
  // print(): logs "Report: {title} ({n} rows)"
  // export("json"): returns JSON.stringify(data)
  // export("csv"): returns comma-joined keys on first line, then values
}

// Tests
const car = new ElectricCar();
console.log(car.describe()); // "A ElectricCar running on electricity up to 250km/h"

const bike = new Bicycle();
console.log(bike.describe()); // "A Bicycle running on human power up to 40km/h"

const report = new Report("Sales", [{ name: "Alice", amount: 100 }, { name: "Bob", amount: 200 }]);
report.print(); // "Report: Sales (2 rows)"
console.log(report.export("json"));
