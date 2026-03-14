// Exercise 1: Decorators
// -----------------------
// Run with: npx tsx 01-decorators.ts

// 1a. Implement a @log method decorator
// It should print: "[MethodName] args: [...] => result"
function log(target: Function, context: ClassMethodDecoratorContext) {
  const methodName = String(context.name);
  return function(this: any, ...args: any[]) {
    const result = target.call(this, ...args);
    console.log(`[${methodName}] args: ${JSON.stringify(args)} => ${JSON.stringify(result)}`);
    return result;
  };
}

// 1b. Implement a @memoize method decorator (single arg methods only for simplicity)
function memoize(target: Function, context: ClassMethodDecoratorContext) {
  const cache = new Map<unknown, unknown>();
  return function(this: any, arg: unknown) {
    if (cache.has(arg)) {
      console.log(`[${String(context.name)}] cache hit for`, arg);
      return cache.get(arg);
    }
    const result = target.call(this, arg);
    cache.set(arg, result);
    return result;
  };
}

// 1c. Implement a @deprecated method decorator
// It should print a warning when the method is called
function deprecated(target: Function, context: ClassMethodDecoratorContext) {
  // YOUR CODE HERE
}

// Apply decorators
class MathService {
  @log
  add(a: number, b: number): number {
    return a + b;
  }

  @memoize
  fibonacci(n: number): number {
    if (n <= 1) return n;
    return this.fibonacci(n - 1) + this.fibonacci(n - 2);
  }

  @deprecated
  oldMethod(): string {
    return "old result";
  }
}

const svc = new MathService();
console.log(svc.add(3, 4));       // logs call + returns 7
console.log(svc.fibonacci(10));   // uses memoization
svc.oldMethod();                  // logs deprecation warning
