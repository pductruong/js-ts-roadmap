# 6.7 TypeScript Compiler API

## Concepts

The TypeScript Compiler API lets you programmatically work with TypeScript source code — read types, traverse the AST, build linters, code generators, and codemods.

### Core concepts
| Concept | Description |
|---|---|
| `Program` | Represents a set of source files being compiled |
| `SourceFile` | AST for a single `.ts` file |
| `Node` | Any node in the AST (identifier, call expression, etc.) |
| `TypeChecker` | Resolves types, symbols, and declarations |
| `Symbol` | Represents a declared entity (variable, function, class) |
| `Type` | The type of a symbol or expression |

### Basic usage
```ts
import ts from "typescript";

// Create a Program from source files
const program = ts.createProgram(["./src/index.ts"], {
  strict: true,
  target: ts.ScriptTarget.ES2022,
});

const checker = program.getTypeChecker();

// Get a source file
const sourceFile = program.getSourceFile("./src/index.ts")!;

// Visit all nodes
ts.forEachChild(sourceFile, node => {
  if (ts.isFunctionDeclaration(node) && node.name) {
    const symbol = checker.getSymbolAtLocation(node.name)!;
    const type = checker.getTypeOfSymbolAtLocation(symbol, node);
    console.log(node.name.text, checker.typeToString(type));
  }
});
```

### Useful APIs
```ts
// Type checks
ts.isFunctionDeclaration(node)
ts.isClassDeclaration(node)
ts.isInterfaceDeclaration(node)
ts.isVariableStatement(node)
ts.isCallExpression(node)

// AST traversal
ts.forEachChild(node, visitor)
ts.visitEachChild(node, visitor, context)

// Type info
checker.getTypeAtLocation(node)
checker.typeToString(type)
checker.getSymbolAtLocation(node)
checker.getDeclaredTypeOfSymbol(symbol)
```

## Resources
- [TypeScript Compiler API docs](https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API)
- [ts-morph](https://ts-morph.com/) — higher-level wrapper around the compiler API
- [TypeScript AST Viewer](https://ts-ast-viewer.com/) ← inspect any code's AST

## Exercises
Go to the [exercises](./exercises/) folder.
