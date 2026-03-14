# 6.8 Project References & Module Resolution

## Project References

Split a large codebase into smaller, independently compilable TypeScript projects.

### When to use
- Monorepos with multiple packages
- Separating frontend/backend while sharing types
- Incremental compilation (only rebuild changed projects)

### Setup
```
repo/
├── tsconfig.base.json
├── packages/
│   ├── shared/
│   │   ├── tsconfig.json   ← { "composite": true }
│   │   └── src/types.ts
│   ├── backend/
│   │   ├── tsconfig.json   ← { "references": [{ "path": "../shared" }] }
│   │   └── src/server.ts
│   └── frontend/
│       ├── tsconfig.json   ← { "references": [{ "path": "../shared" }] }
│       └── src/app.ts
```

### tsconfig for a referenced project
```json
{
  "compilerOptions": {
    "composite": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true,
    "declarationMap": true
  },
  "references": [{ "path": "../shared" }]
}
```

### Build commands
```bash
tsc --build           # build all, respecting references
tsc --build --watch   # watch mode
tsc --build --clean   # clean outputs
```

---

## Module Resolution Strategies

| Strategy | Use case |
|---|---|
| `node` | Legacy CommonJS |
| `node16` / `nodenext` | Modern Node.js ESM+CJS — requires `.js` extensions |
| `bundler` | Vite, esbuild, webpack — extensionless imports OK |

### Path aliases
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@shared/*": ["packages/shared/src/*"]
    }
  }
}
```

```ts
import { User } from "@shared/types"; // instead of ../../packages/shared/src/types
```

## Resources
- [TypeScript: Project References](https://www.typescriptlang.org/docs/handbook/project-references.html)
- [TypeScript: Module Resolution](https://www.typescriptlang.org/docs/handbook/module-resolution.html)

## Exercises
Go to the [exercises](./exercises/) folder.
