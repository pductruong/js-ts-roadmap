# 1.3 Control Flow

## Concepts

### if / else
```js
if (score >= 90) {
  console.log("A");
} else if (score >= 80) {
  console.log("B");
} else {
  console.log("C or below");
}
```

### switch
```js
switch (day) {
  case "Mon":
  case "Tue":
    console.log("Weekday");
    break;
  case "Sat":
  case "Sun":
    console.log("Weekend");
    break;
  default:
    console.log("Unknown");
}
```
> Always include `break` unless you intentionally want fall-through.

### for
```js
for (let i = 0; i < 5; i++) {
  console.log(i); // 0 1 2 3 4
}
```

### while / do...while
```js
let i = 0;
while (i < 3) { console.log(i); i++; }

let j = 0;
do { console.log(j); j++; } while (j < 3);
// do...while always runs at least once
```

### for...of  (iterate values)
```js
const fruits = ["apple", "banana", "cherry"];
for (const fruit of fruits) {
  console.log(fruit);
}
```

### for...in  (iterate keys — use on objects, avoid on arrays)
```js
const obj = { a: 1, b: 2 };
for (const key in obj) {
  console.log(key, obj[key]);
}
```

### break & continue
```js
for (let i = 0; i < 10; i++) {
  if (i === 3) continue; // skip 3
  if (i === 6) break;    // stop at 6
  console.log(i);        // 0 1 2 4 5
}
```

## Resources
- [javascript.info: Conditionals](https://javascript.info/ifelse)
- [javascript.info: switch](https://javascript.info/switch)
- [javascript.info: Loops](https://javascript.info/while-for)
- [MDN: for...of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of)

## Exercises
Go to the [exercises](./exercises/) folder.
