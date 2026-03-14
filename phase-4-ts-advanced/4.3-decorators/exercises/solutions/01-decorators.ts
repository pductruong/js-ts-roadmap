function log(target: Function, context: ClassMethodDecoratorContext) {
  const methodName = String(context.name);
  return function(this: any, ...args: any[]) {
    const result = target.call(this, ...args);
    console.log(`[${methodName}] args: ${JSON.stringify(args)} => ${JSON.stringify(result)}`);
    return result;
  };
}

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

function deprecated(target: Function, context: ClassMethodDecoratorContext) {
  const methodName = String(context.name);
  return function(this: any, ...args: any[]) {
    console.warn(`Warning: ${methodName} is deprecated and will be removed in a future version.`);
    return target.call(this, ...args);
  };
}

class MathService {
  @log
  add(a: number, b: number): number { return a + b; }

  @memoize
  fibonacci(n: number): number {
    if (n <= 1) return n;
    return this.fibonacci(n - 1) + this.fibonacci(n - 2);
  }

  @deprecated
  oldMethod(): string { return "old result"; }
}

const svc = new MathService();
console.log(svc.add(3, 4));
console.log(svc.fibonacci(10));
svc.oldMethod();
