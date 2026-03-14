// Exercise 1: TypeScript Compiler API
// -------------------------------------
// Run with: npx tsx 01-compiler-api.ts

import ts from "typescript";

// 1a. Create a mini code analyzer
// Given TypeScript source code as a string, extract all function names and their return types.

const sampleCode = `
function add(a: number, b: number): number {
  return a + b;
}

const multiply = (x: number, y: number): number => x * y;

async function fetchUser(id: string): Promise<{ name: string }> {
  return { name: "Alice" };
}

class Calculator {
  subtract(a: number, b: number): number {
    return a - b;
  }
}
`;

function analyzeFunctions(sourceCode: string): Array<{ name: string; type: string }> {
  const sourceFile = ts.createSourceFile("temp.ts", sourceCode, ts.ScriptTarget.ES2022, true);
  const host = ts.createCompilerHost({});
  const orig = host.getSourceFile;
  host.getSourceFile = (f, v) => f === "temp.ts" ? sourceFile : orig.call(host, f, v);
  const program = ts.createProgram(["temp.ts"], { strict: true }, host);
  const checker = program.getTypeChecker();
  const results: Array<{ name: string; type: string }> = [];

  function visit(node: ts.Node) {
    // YOUR CODE HERE:
    // Check for ts.isFunctionDeclaration, ts.isVariableDeclaration (arrow fn),
    // and ts.isMethodDeclaration. For each, get the symbol and typeToString.
    // Push { name, type } to results.

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return results;
}

// 1b. List all exported names from source code
function listExports(sourceCode: string): string[] {
  const sourceFile = ts.createSourceFile("temp.ts", sourceCode, ts.ScriptTarget.ES2022, true);
  const exports: string[] = [];

  function visit(node: ts.Node) {
    const isExported =
      ts.canHaveModifiers(node) &&
      ts.getModifiers(node)?.some(m => m.kind === ts.SyntaxKind.ExportKeyword);

    if (isExported) {
      // YOUR CODE HERE: extract name from function/class/interface/variable declarations
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return exports;
}

// Tests
const functions = analyzeFunctions(sampleCode);
console.log("Functions found:");
functions.forEach(f => console.log(`  ${f.name}: ${f.type}`));

const exportCode = `
export function greet(name: string): string { return "Hello " + name; }
export const PI = 3.14;
export interface User { name: string; }
export class MyService {}
function internal() {}
`;
console.log("\nExports:", listExports(exportCode));
