# 2.3 Modules

## Concepts

### CommonJS (Node.js default for .js without "type":"module")
```js
// math.js
function add(a, b) { return a + b; }
module.exports = { add };

// main.js
const { add } = require("./math");
```

### ES Modules (modern, used in this repo)
```js
// math.js
export function add(a, b) { return a + b; }
export const PI = 3.14159;
export default class Calculator { /* ... */ }

// main.js
import Calculator, { add, PI } from "./math.js";
import * as math from "./math.js"; // import everything as namespace
```

### Named vs Default exports
- **Named**: explicit name, can have many per file
- **Default**: one per file, importer can rename freely

```js
import anything from "./module.js"; // default
import { specific } from "./module.js"; // named
import anything, { specific } from "./module.js"; // both
```

### Dynamic import
```js
// Load a module only when needed
const { heavy } = await import("./heavy-module.js");
```

## Resources
- [javascript.info: Modules](https://javascript.info/modules-intro)
- [javascript.info: Export and Import](https://javascript.info/import-export)
- [javascript.info: Dynamic imports](https://javascript.info/modules-dynamic-imports)
- [MDN: ES Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)

## Exercises
Go to the [exercises](./exercises/) folder.
