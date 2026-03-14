import ts from "typescript";

const sampleCode = `
function add(a: number, b: number): number { return a + b; }
const multiply = (x: number, y: number): number => x * y;
async function fetchUser(id: string): Promise<{ name: string }> { return { name: "Alice" }; }
class Calculator {
  subtract(a: number, b: number): number { return a - b; }
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
    if (ts.isFunctionDeclaration(node) && node.name) {
      const sym = checker.getSymbolAtLocation(node.name);
      if (sym) results.push({ name: sym.getName(), type: checker.typeToString(checker.getTypeOfSymbolAtLocation(sym, node)) });
    } else if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name)) {
      const init = node.initializer;
      if (init && (ts.isArrowFunction(init) || ts.isFunctionExpression(init))) {
        const sym = checker.getSymbolAtLocation(node.name);
        if (sym) results.push({ name: sym.getName(), type: checker.typeToString(checker.getTypeOfSymbolAtLocation(sym, node)) });
      }
    } else if (ts.isMethodDeclaration(node) && ts.isIdentifier(node.name)) {
      const sym = checker.getSymbolAtLocation(node.name);
      if (sym) results.push({ name: sym.getName(), type: checker.typeToString(checker.getTypeOfSymbolAtLocation(sym, node)) });
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return results;
}

function listExports(sourceCode: string): string[] {
  const sourceFile = ts.createSourceFile("temp.ts", sourceCode, ts.ScriptTarget.ES2022, true);
  const exports: string[] = [];

  function getName(node: ts.Node): string | undefined {
    if (ts.isFunctionDeclaration(node) || ts.isClassDeclaration(node) || ts.isInterfaceDeclaration(node)) return node.name?.text;
    if (ts.isVariableStatement(node)) return node.declarationList.declarations.map(d => ts.isIdentifier(d.name) ? d.name.text : "").filter(Boolean).join(", ");
    return undefined;
  }

  function visit(node: ts.Node) {
    const isExported = ts.canHaveModifiers(node) && ts.getModifiers(node)?.some(m => m.kind === ts.SyntaxKind.ExportKeyword);
    if (isExported) { const name = getName(node); if (name) exports.push(name); }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return exports;
}

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
