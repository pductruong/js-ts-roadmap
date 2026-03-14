export declare function add(a: number, b: number): number;
export declare function subtract(a: number, b: number): number;
export declare function multiply(a: number, b: number): number;
export declare function divide(a: number, b: number): number;
export declare const PI: number;
export declare class Vector2D {
  x: number;
  y: number;
  constructor(x: number, y: number);
  add(other: Vector2D): Vector2D;
  magnitude(): number;
  toString(): string;
}
