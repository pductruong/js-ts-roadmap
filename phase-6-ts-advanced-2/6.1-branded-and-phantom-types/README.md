# 6.1 Branded & Phantom Types

## The Problem
TypeScript's type system is **structural** — two types with the same shape are interchangeable. This causes bugs when you have same-primitive types that should never be mixed.

```ts
type UserId  = number;
type OrderId = number;

function getOrder(userId: UserId, orderId: OrderId) {}

getOrder(orderId, userId); // TypeScript accepts this — but it's wrong!
```

## Branded Types (Nominal Types)
Add a phantom brand property to make types nominally distinct:

```ts
type Brand<T, B> = T & { readonly _brand: B };

type UserId  = Brand<number, "UserId">;
type OrderId = Brand<number, "OrderId">;

const asUserId  = (n: number): UserId  => n as UserId;
const asOrderId = (n: number): OrderId => n as OrderId;

const uid = asUserId(1);
const oid = asOrderId(2);

getOrder(oid, uid); // TypeScript Error now!
```

The `_brand` property only exists in the type system — zero runtime cost.

## Phantom Types
Encode state machine transitions in the type system — invalid transitions become compile errors:

```ts
type Form<State extends "raw" | "validated"> = {
  data: Record<string, string>;
  _state?: State; // phantom — never stored at runtime
};

function validate(form: Form<"raw">): Form<"validated"> {
  return form as Form<"validated">;
}

function submit(form: Form<"validated">) { /* ... */ }

const raw = {} as Form<"raw">;
submit(raw);             // Error!
submit(validate(raw));   // OK
```

## Resources
- [type-fest: Brand](https://github.com/sindresorhus/type-fest)
- [TypeScript handbook: Structural typing](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html#structural-typing)

## Exercises
Go to the [exercises](./exercises/) folder.
