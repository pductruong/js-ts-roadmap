# 1.6 Error Handling

## Concepts

### try / catch / finally
```js
try {
  const data = JSON.parse(invalidJSON); // throws SyntaxError
} catch (err) {
  console.error(err.message);
} finally {
  console.log("always runs"); // cleanup goes here
}
```

### Built-in Error Types
| Type | When it occurs |
|---|---|
| `Error` | Generic base error |
| `TypeError` | Wrong type used |
| `RangeError` | Value out of valid range |
| `SyntaxError` | Invalid syntax (e.g. bad JSON) |
| `ReferenceError` | Variable not defined |

```js
typeof null.toString(); // TypeError
new Array(-1);          // RangeError
```

### Custom Errors
```js
class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}

throw new ValidationError("Required field", "email");
```

### Catching by type
```js
try {
  // ...
} catch (err) {
  if (err instanceof ValidationError) {
    console.log("Field:", err.field);
  } else {
    throw err; // re-throw unknown errors
  }
}
```

## Resources
- [javascript.info: Error handling](https://javascript.info/try-catch)
- [javascript.info: Custom errors](https://javascript.info/custom-errors)
- [MDN: Error types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

## Exercises
Go to the [exercises](./exercises/) folder.
