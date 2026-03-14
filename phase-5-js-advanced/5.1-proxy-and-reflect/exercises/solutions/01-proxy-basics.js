function createValidatedUser() {
  return new Proxy({}, {
    set(target, key, value, receiver) {
      if (key === "age") {
        if (typeof value !== "number" || value < 0 || value > 150)
          throw new TypeError(`Invalid age: ${value}`);
      }
      if (key === "name") {
        if (typeof value !== "string" || value.trim() === "")
          throw new TypeError(`Invalid name: "${value}"`);
      }
      return Reflect.set(target, key, value, receiver);
    },
  });
}

function withDefaults(target, defaults) {
  return new Proxy(target, {
    get(target, key, receiver) {
      if (key in target) return Reflect.get(target, key, receiver);
      return key in defaults ? defaults[key] : undefined;
    },
  });
}

function readOnly(target) {
  return new Proxy(target, {
    set(_, key) { throw new TypeError(`Cannot set property "${key}" on read-only object`); },
    deleteProperty(_, key) { throw new TypeError(`Cannot delete property "${key}" on read-only object`); },
  });
}

function withLogging(target, label) {
  return new Proxy(target, {
    get(target, key, receiver) {
      const value = Reflect.get(target, key, receiver);
      console.log(`[${label}] GET ${String(key)} => ${value}`);
      return value;
    },
    set(target, key, value, receiver) {
      console.log(`[${label}] SET ${String(key)} = ${value}`);
      return Reflect.set(target, key, value, receiver);
    },
  });
}

const user = createValidatedUser();
user.name = "Alice"; user.age = 30;
console.log(user.name, user.age);
try { user.age = 200; } catch (e) { console.log(e.message); }
try { user.name = ""; } catch (e) { console.log(e.message); }

const config = withDefaults({ host: "localhost" }, { port: 3000, debug: false });
console.log(config.host, config.port, config.debug);

const frozen = readOnly({ x: 1 });
console.log(frozen.x);
try { frozen.x = 99; } catch (e) { console.log(e.message); }

const logged = withLogging({ count: 0 }, "counter");
logged.count = 5; logged.count;
