function createEntity(id, name) {
  const entity = {};
  Object.defineProperty(entity, "_id", {
    value: id,
    writable: false,
    enumerable: false,
    configurable: false,
  });
  Object.defineProperty(entity, "name", {
    value: name,
    writable: true,
    enumerable: true,
    configurable: true,
  });
  return entity;
}

function createPerson(first, last) {
  const person = { first, last };
  Object.defineProperty(person, "fullName", {
    get() { return `${this.first} ${this.last}`; },
    set(val) { [this.first, this.last] = val.split(" "); },
    enumerable: true,
    configurable: true,
  });
  return person;
}

function deepFreeze(obj) {
  Object.freeze(obj);
  for (const key of Reflect.ownKeys(obj)) {
    const val = obj[key];
    if (val && typeof val === "object" && !Object.isFrozen(val)) {
      deepFreeze(val);
    }
  }
  return obj;
}

function copyAll(source) {
  return Object.create(
    Object.getPrototypeOf(source),
    Object.getOwnPropertyDescriptors(source)
  );
}

const entity = createEntity(42, "Alice");
console.log(entity.name);
console.log(Object.keys(entity));

const person = createPerson("John", "Doe");
console.log(person.fullName);
person.fullName = "Jane Smith";
console.log(person.first, person.last);

const config = deepFreeze({ db: { host: "localhost", port: 5432 }, debug: true });
config.db.port = 9999;
console.log(config.db.port);

const src = {};
Object.defineProperty(src, "secret", { value: "hidden", enumerable: false, writable: true, configurable: true });
src.name = "visible";
const copy = copyAll(src);
const desc = Object.getOwnPropertyDescriptor(copy, "secret");
console.log(desc.value, desc.enumerable);
