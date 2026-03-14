// node16/nodenext requires explicit .js because Node.js ESM spec requires extensions.
// TypeScript maps .js imports to .ts sources at compile time to match Node.js runtime behavior.

// Bundlers (Vite, esbuild) handle module resolution themselves and support extensionless imports,
// so TypeScript just needs to find the type information — it doesn't enforce Node.js ESM rules.

function resolveAlias(alias: string, paths: Record<string, string[]>): string[] {
  for (const [pattern, replacements] of Object.entries(paths)) {
    const prefix = pattern.replace("*", "");
    if (alias.startsWith(prefix)) {
      const rest = alias.slice(prefix.length);
      return replacements.map(r => r.replace("*", rest));
    }
  }
  return [alias];
}

const recommendations: Record<string, string> = {
  "Node.js app with CommonJS (old)":     "node",
  "Node.js app with ESM (modern)":       "node16 or nodenext",
  "Vite/Next.js/webpack frontend":       "bundler",
  "Library targeting both CJS and ESM":  "node16 or nodenext (strictest, widest compatibility)",
};

const paths = {
  "@/*":       ["src/*"],
  "@utils/*":  ["src/utils/*"],
  "@shared/*": ["packages/shared/src/*"],
};

console.log(resolveAlias("@/components/Button", paths));
console.log(resolveAlias("@utils/string", paths));
console.log(resolveAlias("@shared/types", paths));
console.log(resolveAlias("react", paths));
console.log(recommendations);
