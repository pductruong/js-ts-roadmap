# 6.9 Custom ESLint Rules with Type Information

## Concepts

Custom ESLint rules with TypeScript type info can enforce conventions that go beyond syntax — they can check types, generic parameters, and semantic relationships.

### Setup
```bash
npm install --save-dev @typescript-eslint/parser @typescript-eslint/utils eslint
```

### Rule structure
```ts
import { RuleCreator } from "@typescript-eslint/utils/eslint-utils";

const createRule = RuleCreator(name => `https://example.com/rules/${name}`);

export const noConsoleLog = createRule({
  name: "no-console-log",
  meta: {
    type: "problem",
    docs: { description: "Disallow console.log in production code" },
    messages: { noConsole: "Do not use console.log in production" },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      CallExpression(node) {
        if (
          node.callee.type === "MemberExpression" &&
          node.callee.object.type === "Identifier" &&
          node.callee.object.name === "console" &&
          node.callee.property.type === "Identifier" &&
          node.callee.property.name === "log"
        ) {
          context.report({ node, messageId: "noConsole" });
        }
      },
    };
  },
});
```

### Rules with type information
```ts
create(context) {
  const services = context.sourceCode.parserServices;
  const checker = services?.program?.getTypeChecker();

  return {
    Identifier(node) {
      const tsNode = services?.esTreeNodeToTSNodeMap.get(node);
      const type = checker?.getTypeAtLocation(tsNode);
      // Use type info to make rule decisions
    },
  };
}
```

### Important typescript-eslint rules to know
| Rule | What it enforces |
|---|---|
| `no-floating-promises` | All promises must be awaited or explicitly ignored |
| `require-await` | async functions must use await |
| `no-misused-promises` | Promises must not appear in boolean contexts |
| `strict-boolean-expressions` | No implicit boolean coercion of non-booleans |
| `no-explicit-any` | Disallow `any` type usage |
| `consistent-type-imports` | Use `import type` for type-only imports |

## Resources
- [typescript-eslint: Custom rules](https://typescript-eslint.io/developers/custom-rules)
- [ESLint: Working with rules](https://eslint.org/docs/developer-guide/working-with-rules)
- [AST Explorer](https://astexplorer.net/)

## Exercises
Go to the [exercises](./exercises/) folder.
