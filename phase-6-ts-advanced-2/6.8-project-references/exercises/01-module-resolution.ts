// Exercise 1: Module Resolution & Path Aliases
// ---------------------------------------------

// 1a. Resolution order — fill in what TypeScript tries for each strategy

// For "node" strategy, `import { x } from "./utils"` tries:
// 1. ./utils.ts
// 2. ./utils.tsx
// 3. ./utils.d.ts
// 4. ./utils/index.ts
// 5. ./utils/package.json (types field)

// For "node16"/"nodenext" with ESM, you must write:
// import { x } from "./utils.js"  ← resolves to utils.ts at compile time
// YOUR NOTE: why is the .js extension required in node16?

// For "bundler", extensionless is fine because:
// YOUR NOTE: explain why bundlers handle this differently

// 1b. Simulate path alias resolution
function resolveAlias(
  alias: string,
  paths: Record<string, string[]>
): string[] {
  // YOUR CODE HERE:
  // Match alias against each pattern (treating * as wildcard)
  // Return the resolved paths with * replaced by the matched portion
  for (const [pattern, replacements] of Object.entries(paths)) {
    const prefix = pattern.replace("*", "");
    if (alias.startsWith(prefix)) {
      const rest = alias.slice(prefix.length);
      return replacements.map(r => r.replace("*", rest));
    }
  }
  return [alias]; // no match — return as-is
}

// 1c. Which tsconfig moduleResolution should you use?
// Fill in the recommendation for each scenario:
const recommendations: Record<string, string> = {
  "Node.js app with CommonJS (old)":      "node",
  "Node.js app with ESM (modern)":        "YOUR ANSWER",
  "Vite/Next.js/webpack frontend":        "YOUR ANSWER",
  "Library targeting both CJS and ESM":   "YOUR ANSWER",
};

// Tests
const paths = {
  "@/*":       ["src/*"],
  "@utils/*":  ["src/utils/*"],
  "@shared/*": ["packages/shared/src/*"],
};

console.log(resolveAlias("@/components/Button", paths));
// ["src/components/Button"]

console.log(resolveAlias("@utils/string", paths));
// ["src/utils/string"]

console.log(resolveAlias("@shared/types", paths));
// ["packages/shared/src/types"]

console.log(resolveAlias("react", paths));
// ["react"] — not an alias

console.log(recommendations);
