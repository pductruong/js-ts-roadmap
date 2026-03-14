function pipe(...fns) {
  return x => fns.reduce((v, f) => f(v), x);
}

function compose(...fns) {
  return x => fns.reduceRight((v, f) => f(v), x);
}

function curry(fn) {
  return a => b => fn(a, b);
}

function slugify(text) {
  return pipe(
    s => s.trim(),
    s => s.toLowerCase(),
    s => s.replace(/\s+/g, "-"),
    s => s + ".html"
  )(text);
}

const double = x => x * 2;
const addOne = x => x + 1;
const square = x => x * x;

console.log(pipe(double, addOne, square)(3));       // 49
console.log(compose(square, addOne, double)(3));    // 49
const add = curry((a, b) => a + b);
const add5 = add(5);
console.log(add5(3)); console.log(add5(10));
console.log(slugify("  Hello World  "));
