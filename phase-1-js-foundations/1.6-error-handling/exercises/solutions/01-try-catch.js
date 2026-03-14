function safeParseJSON(str) {
  try {
    return JSON.parse(str);
  } catch {
    return null;
  }
}

function safeGet(obj, key, defaultValue) {
  try {
    const value = obj[key];
    return value !== undefined ? value : defaultValue;
  } catch {
    return defaultValue;
  }
}

function divide(a, b) {
  if (b === 0) throw new Error("Cannot divide by zero");
  return a / b;
}

function safeDivide(a, b) {
  try {
    return divide(a, b);
  } catch {
    return null;
  }
}

function withCleanup(fn) {
  try {
    return fn();
  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    console.log("done");
  }
}

console.log(safeParseJSON('{"a":1}'));
console.log(safeParseJSON("not json"));
console.log(safeDivide(10, 2));
console.log(safeDivide(10, 0));
withCleanup(() => "ok");
withCleanup(() => { throw new Error("oops"); });
